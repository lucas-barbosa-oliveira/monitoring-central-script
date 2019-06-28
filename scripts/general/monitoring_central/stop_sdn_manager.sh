ps -ef | grep 'snd_manager' | awk '{print $2}' | xargs kill -9
