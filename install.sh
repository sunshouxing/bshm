#!/usr/bin/env bash

#
# This script try to install angular-fullstack and its dependencies automatically.
# Usage: angular-fullstack-install app_name
#

set -vx

readonly TOOLS_HOME="$HOME/Tools"
readonly BUILD_DIR="$(dirname $(readlink -f $0))"
readonly APP_DIR="${BUILD_DIR}/${1}"

readonly CNPM_MIRRORS="https://npm.taobao.org/mirrors"
readonly NODE_VERSION="v6.11.3"
readonly PHANTOMJS_VERSION="2.1.1"

install() {
    app=${1}
    version=${2}

    [ ${app} = 'node' ] \
    && url="${CNPM_MIRRORS}/${app}/${version}/${app}-${version}-linux-x64.tar.gz" \
    || url="${CNPM_MIRRORS}/${app}/${app}-${version}-linux-x86_64.tar.bz2"

    wget ${url} -O - | tar zxf - -C ${TOOLS_HOME}
    [ -d ${TOOLS_HOME}/${app} ] && rm -rf ${TOOLS_HOME}/${app}
    [ -L ${TOOLS_HOME}/${app} ] && unlink ${TOOLS_HOME}/${app}
    ln -s ${TOOLS_HOME}/${app}-${version}* ${TOOLS_HOME}/${app}
}

#
# Install nodejs
#
[ -d ${TOOLS_HOME}/node-${NODE_VERSION}-linux-x64 ] || install node $NODE_VERSION

#
# Install phantomjs
#
[ -d ${TOOLS_HOME}/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64 ] || install phantomjs $PHANTOMJS_VERSION

#
# Add node and phantomjs bin directory to PATH
#
export PATH=${TOOLS_HOME}/node/bin:${TOOLS_HOME}/phantomjs/bin:$PATH

#
# Install cnpm
#
npm install -g cnpm --registry=https://registry.npm.taobao.org

#
# Install generator-angular-fullstack and its dependencies
#
cnpm install -g yo gulp-cli generator-angular-fullstack node-gyp

#
# Use python2.7 for node-gyp
#
cnpm config set python /usr/bin/python2.7

#
# Generate anuglar fullstack templates and install node moduels
#
mkdir -p ${APP_DIR} && cd ${APP_DIR}
yo angular-fullstack --skip-install && cnpm install
