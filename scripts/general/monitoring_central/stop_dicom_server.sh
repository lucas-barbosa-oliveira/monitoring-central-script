ps -ef | grep 'dcm4chee' | awk '{print $2}' | sudo xargs kill -9
