ps -ef | grep 'OpenICE' | awk '{print $2}' | xargs kill -9