sudo ethtool -s enp2s0 speed 100 duplex full autoneg on

#cd /home/nutes/Documentos/dicom/dcm4che-5.15.0/bin
cd $1/../applications/dicom/bin
./storescu -c DCM4CHEE@192.168.3.1:11112 $1/../applications/dicom-client/images/1.3.6.1.4.1.5962.99.1.2280943358.716200484.1363785608958.557.0.dcm
