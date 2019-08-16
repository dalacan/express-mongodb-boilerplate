FROM node:12-alpine

# Create application directory
WORKDIR './app'

# Bundle app
COPY . .

# Install depedencies
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]