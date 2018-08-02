#!/bin/bash -e

. ../extra-files/scripts/release-and-publish/commons.sh

production() {
  local service=$1
  local branch=$2
  local tag=$3

  release_and_publish_production_npm_docker_image "${service}" "${branch}" "${tag}"
}

candidate() {
  local service=$1
  local branch=$2
  local tag=$3

  release_and_publish_candidate_npm_docker_image "${service}" "${branch}" "${tag}"
}

main "$@"
