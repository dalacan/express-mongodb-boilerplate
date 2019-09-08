const express = require('express');

const router = express.Router();

let lastCommitSha = '';

if (process.env.SOURCE_COMMIT) {
  lastCommitSha = process.env.SOURCE_COMMIT;
} else {
  // eslint-disable-next-line global-require
  lastCommitSha = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim();
}

const status = {
  [process.env.npm_package_name]: [
    {
      version: process.env.npm_package_version,
      description: process.env.npm_package_description,
      lastcommitsha: lastCommitSha,
    },
  ],
};

router.get('/', (req, res) => {
  res.status(200).json(status);
});

module.exports = router;
