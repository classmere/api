FROM node:6.3
RUN mkdir /classmere
WORKDIR /classmere
ADD . /classmere/
RUN npm install