FROM node:4
COPY . /src/
WORKDIR /src
RUN npm install --production
ENTRYPOINT ["npm"]
CMD ["start"]