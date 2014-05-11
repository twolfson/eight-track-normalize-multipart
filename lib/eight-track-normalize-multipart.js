// Load in dependencies
var _ = require('underscore');

// Define helper function to parse data
function normalizeMultipart(info) {
  // Find the content type header
  var contentTypeKey = 'content-type';
  var contentType = info.headers[contentTypeKey];
  if (!contentType) {
    contentTypeKey = 'Content-Type';
    contentType = info.headers[contentTypeKey];
  }

  // If we have a multipart form
  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    // Replace the random boundary with a predictable form
    info.headers = _.clone(info.headers);
    info.headers[contentTypeKey] = contentType.replace(/(\-+)\d+/, '$1somenumber');

    // Replace the boundary in the body as well
    info.body = info.body.toString().replace(/(\-+)\d+/g, '$1somenumber');
  }

  // Return our info
  return info;
}

// Export our helper function
module.exports = normalizeMultipart;
