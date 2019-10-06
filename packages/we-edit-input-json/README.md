# we-edit-input-json
An we-edit input type extention supporting xml and json type of data

## design
The input data can be convert to dom, and then cheerio and transactify dom can be used for parse and editing. 

## api: you can extend XMLDocument by implementing the following method
> dataToDom(data): to convert raw data to dom
> nodeToString(node): to convert node to string


