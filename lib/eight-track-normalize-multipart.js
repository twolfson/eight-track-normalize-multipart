var _ = require('underscore');
function normalizeMultipart(info) {
  info.headers = _.defaults({
    'content-type': info.headers['content-type'].replace(/(\-+)\d+/, '$1somenumber')
  }, info.headers);
  info.body = info.body.toString().replace(/(\-+)\d+/g, '$1somenumber');
  return info;
}

module.exports = normalizeMultipart;
