ps -ef | grep 'openice' | awk '{print $2}' | xargs kill -9
