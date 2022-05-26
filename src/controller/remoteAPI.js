const axios = require('axios');
const axiosRetry = require('axios-retry');

class RemoteAPI {
  static async updateRemoteApi(req, res) {
    const { new1, new2 } = req.body;
    console.log(new1, new1, 'data from request body');
    try {
      // GET THE INITIAL VALUE FROM RESOURCE1 BEFORE ALTERING IT
      const { data } = await axios.get('https://api/resource1');
      const prevNew1 = data.new1;

      // MAKE A PUT REQUEST TO ALTER RESOURCE1
      await axios({
        method: 'PUT',
        url: '/api/resource1',
        data: {
          new1,
        },
      });

      // SET AXIOS TO RETRY EACH REQUEST 3 TIMES
      axiosRetry(axios, {
        retries: 3,
        retryDelay: (retryCount) => {
          console.log(`retry attempt: ${retryCount}`);
          return retryCount * 2000; // time interval between retries
        },
        retryCondition: (error) => error.response.status === 503,
      });

      // MAKE A PUT REQUEST TO ALTER RESOURCE2 RETRYING 3 TIMES IF IT FAILS ON ANY
      axios({
        method: 'PUT',
        url: '/api/resource2',
        data: {
          new2,
        },
      }).catch(async (err) => {
        if (err.response.status !== 200) {
          // REVERT THE RESOURCE1 WHEN UPDATE TO RESOURCE2 FAILS
          await axios.put('/api/resource1', {
            new1: prevNew1,
          });

          res.status(err.response.status).json({
            status: 'fail',
            message: `API call failed with status code: ${err.response.status} after 3 retry attempts`,
          });
        }
      });
      res.status(200).json({
        status: 'success',
        message: `Transaction successfully completed!`,
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `API call failed with the error: ${err.message}`,
      });
    }
  }
}

export default RemoteAPI;
