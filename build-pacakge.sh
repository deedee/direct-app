#!/bin/bash

#Preparing paackage
VER=`date "+%Y%m%d%H%M"`

function directapp_cdpacakge()
{
#direct app package building
BUILD_VARIABLE_FILE_NAME="./buildvar-app.conf"
source $BUILD_VARIABLE_FILE_NAME
AWS_CD_PACKAGE_NAME="${APPNAME}-${PACKAGETYPE}-${VER}.zip"
PACAKAGE_LOCATION="dist-${PACKAGETYPE}"
SCRIPTDIR="./../buildscript/direct/scripts"
mkdir $PACAKAGE_LOCATION
cd $PACAKAGE_LOCATION
# Take backup of existing direct.jar, direct-static-all.jar and jboss/conf
cp $SCRIPTDIR/remote-cmd-backup-app.sh $PACAKAGE_LOCATION/
# Copy direct-static-all.jar and direct.jar to app1 at /home/direct/direct_backup
cp direct.jar $PACAKAGE_LOCATION/
# Take backup of existing direct.jar, copy new direct.jar to /home/direct/direct_deploy on app1 and unzip it
cp $SCRIPTDIR/remote-cmd-expand-app.sh $PACAKAGE_LOCATION/
# Shut down JBoss instance
cp $SCRIPTDIR/remote-cmd-stop-server.sh $PACAKAGE_LOCATION/
# Take backup of existing direct.ear and deploy new direct.ear to jboss deploy dir
cp $SCRIPTDIR/remote-cmd-deploy-app.sh execute $PACAKAGE_LOCATION/
# start jboss 
cp $SCRIPTDIR/remote-cmd-start-server.sh execute $PACAKAGE_LOCATION/
# start copying appspec.yml
cp appspec-app.yml $PACAKAGE_LOCATION/appspec.yml
zip -j $AWS_CD_PACKAGE_NAME $PACAKAGE_LOCATION/*
}

function directweb_cdpacakge()
{
#direct app package building
BUILD_VARIABLE_FILE_NAME="./buildvar-web.conf"
source $BUILD_VARIABLE_FILE_NAME
AWS_CD_PACKAGE_NAME="${APPNAME}-${PACKAGETYPE}-${VER}.zip"
PACAKAGE_LOCATION="dist-${PACKAGETYPE}"
mkdir $PACAKAGE_LOCATION
cd $PACAKAGE_LOCATION
# Take backup of existing direct.jar, direct-static-all.jar and jboss/conf
cp $SCRIPTDIR/remote-cmd-backup-web.sh $PACAKAGE_LOCATION/
# Copy direct-static-all.jar and direct.jar to app1 at /home/direct/direct_backup
cp direct-static-all.jar $PACAKAGE_LOCATION/
# Unzip direct-static-all.jar and move ccs, js and images to /usr/local/apache/tcdocs /css/scrits/images
cp $SCRIPTDIR/remote-cmd-expand-web.sh $PACAKAGE_LOCATION/
# start copying appspec.yml
cp appspec-app.yml $PACAKAGE_LOCATION/appspec.yml
zip -j $AWS_CD_PACKAGE_NAME $PACAKAGE_LOCATION/*
}


directapp_cdpacakge
directweb_cdpacakge
VER1=$VER
echo export VER="$VER1" >> "$BASH_ENV"

