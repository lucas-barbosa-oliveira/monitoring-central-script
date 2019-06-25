ovs-vsctl --db=tcp:192.168.2.1:6640 clear port eth0.1 qos \
	-- --all destroy qos \
	-- --all destroy queue \
	-- set port eth0.1 qos=@newqos -- --id=@newqos create qos \
type=linux-htb other-config:max-rate=100000000 \
	-- list qos \
	-- list queue