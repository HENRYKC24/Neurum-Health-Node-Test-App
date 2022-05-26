const axios = require('axios');
const axiosRetry = require('axios-retry');

class RemoteAPI {
  static async updateRemoteApi(req, res) {
    const { new1, new2 } = req.body;
    if (
      !new1.trim() ||
      !new2.trim() ||
      typeof new1 != 'string' ||
      typeof new2 != 'string'
    ) {
      res.status(400).json({
        status: 'fail',
        message: `Type of ${new1} and ${new2} must be a valid string with minimum of 2 characters.`,
        data: {
          new1,
          new2,
        },
      });
    }

    // SET AXIOS TO RETRY EACH REQUEST 3 TIMES
    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 2000; // time interval between retries
      },
      retryCondition: (error) => error.response.status === 503,
    });

    try {
      // GET THE INITIAL VALUE FROM RESOURCE1 BEFORE ALTERING IT
      const { data } = await axios.get('https://api/resource1');
      const prevNew1 = data.new1;

      // MAKE A PUT REQUEST TO ALTER RESOURCE1
      const response1 = await axios({
        method: 'PUT',
        url: '/api/resource1',
        data: {
          new1,
        },
      });

      if (response1.status >= 200 && response1.status <= 202) {
        axios({
          method: 'PUT',
          url: '/api/resource2',
          data: {
            new2,
          },
        }).catch(async (err) => {
          // REVERT THE RESOURCE1 WHEN UPDATE TO RESOURCE2 FAILS
          await axios.put('/api/resource1', {
            new1: prevNew1,
          });

          res.status(err.response.status).json({
            status: 'fail',
            message: `API call failed with status code: ${err.response.status} after 3 retry attempts`,
          });
        });

        res.status(200).json({
          status: 'success',
          message: `Transaction successfully completed!`,
        });
      } else {
        res.status(response1.status).json({
          status: 'fail',
          message: `API call failed with status code: ${response1.status} after 3 retry attempts`,
        });
      }

      // MAKE A PUT REQUEST TO ALTER RESOURCE2 RETRYING 3 TIMES IF IT FAILS ON ANY
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `API call failed with the error: ${err.message}`,
      });
    }
  }
}

export default RemoteAPI;
