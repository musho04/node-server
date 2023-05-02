const express = require('express');
const app = express();
const jenkins = require('jenkins');
const JENKINS_URL = 'http://localhost:8084/';
const JOB_NAME = '2my-job';
const USERNAME = 'admin';
const API_TOKEN = '11314f5997bbf75eeec5c5e75b96d5c79e';

const jenkinsApi = new jenkins({
  baseUrl: JENKINS_URL,
  promisify: true,
  headers: {
    Authorization: `Basic ${Buffer.from(`${USERNAME}:${API_TOKEN}`).toString('base64')}`
  }
});



app.get('/run-job', (req, res) => {

  const runJen = jenkinsApi.job.build('2my-job', (err, data) => {
    if (err) {
    console.error(err);
    } else {
    console.log('Job started successfully');
    console.log(`Build number: ${data}`);
  }
});
  res.send('helo world');
});


app.listen(3000, () => {

  console.log('Server listening on port 3000');
});

