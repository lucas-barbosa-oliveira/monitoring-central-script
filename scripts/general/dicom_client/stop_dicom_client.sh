ps -ef | grep 'storescu' | awk '{print $2}' | xargs kill -9
