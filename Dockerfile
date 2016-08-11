FROM node:6.3
ENV name /classmere_api
RUN mkdir $name
WORKDIR $name
ADD . $name/
RUN npm install