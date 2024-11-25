# Use an arm64 base image
FROM arm64v8/alpine:latest

# Set the working directory
WORKDIR /app

# Create a simple script to print "Hello World!"
RUN echo 'echo "Hello World!"' > hello.sh

# Make the script executable
RUN chmod +x hello.sh

# Set the entrypoint to the script
ENTRYPOINT ["./hello.sh"]