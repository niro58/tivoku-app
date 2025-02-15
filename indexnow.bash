#!/bin/bash

# Variables
KEY="zeygwquxo6kqipytj9ipglmx8m9hvbyh6yhl2uexamxdfvfkxwldenqhxhgfpe"
URL="https://www.tivoku.com"  # Your website's domain
INDEXNOW_URL="https://api.indexnow.org/indexnow?url=url-changed&key=your-key"

# Send the request using curl
curl -X POST "$INDEXNOW_URL" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "{
           \"host\": \"$URL\",
           \"key\": \"$KEY\",
           \"urlList\": [
             \"https://www.tivoku.com\",
             \"https://www.tivoku.com/image-resizer\",
             \"https://www.tivoku.com/video-converter\",
             \"https://www.tivoku.com/website-blocker\"
           ]
         }"

if [ $? -eq 0 ]; then
    echo "Indexing request sent successfully."
else
    echo "Failed to send indexing request."
fi