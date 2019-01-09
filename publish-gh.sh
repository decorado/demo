#!/bin/bash

LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD);

GH_REMOTE_BRANCH='master';

GH_LOCAL_BRANCH="gh-page"

log() {
  echo "PUBLISH-GH:: $1";
}

return_previous_branch() {
  git checkout -;
}

return_previous_branch_and_exit() {
  return_previous_branch;
  exit 1;
}

drop_local_gh_branch() {
  if (git branch -D ${GH_LOCAL_BRANCH}) then
    log "${GH_LOCAL_BRANCH} branch removed";
  else
    log "${GH_LOCAL_BRANCH} branch does not exist";
  fi
}

create_local_gh_branch() {
  if (git checkout -b ${GH_LOCAL_BRANCH}) then
    log "${GH_LOCAL_BRANCH} created";
  else
    log "${GH_LOCAL_BRANCH} could not be created";
    return_previous_branch_and_exit;
  fi
}

inform_operation_start() {
  log "Publish from ${LOCAL_BRANCH} to github ${GH_REMOTE_BRANCH}";
}

build_gh_docs() {
  if (npm run build.gh) then
    log "${GH_LOCAL_BRANCH} builded";
  else
    log "${GH_LOCAL_BRANCH} could not be builded";
    return_previous_branch_and_exit;
  fi
}


add_files_to_commit() {
  if (git add .) then
    log "Files added to commit";
  else
    log "Files could not be added to commit";
    return_previous_branch_and_exit;
  fi
}
commit_docs_build() {
  if (git commit -m "build of ${LOCAL_BRANCH}") then
    log "${LOCAL_BRANCH} build commited into ${GH_LOCAL_BRANCH}";
  else
    log "${LOCAL_BRANCH} could not be commited into ${GH_LOCAL_BRANCH}";
    return_previous_branch_and_exit;
  fi
}

push_force_to_remote_gh() {
  if (git push github ${GH_LOCAL_BRANCH}:${GH_REMOTE_BRANCH} -f) then
    log "${LOCAL_BRANCH} build pushed into ${GH_REMOTE_BRANCH}";
  else
    log "${LOCAL_BRANCH} could not be pushed into ${GH_REMOTE_BRANCH}";
    return_previous_branch_and_exit;
  fi
}

clean_docs_folder() {
  git clean -fd
}

# Pipeline
if (inform_operation_start) then
  if (drop_local_gh_branch) then
    if (create_local_gh_branch) then
      if (build_gh_docs) then
        if (add_files_to_commit) then
          if (commit_docs_build) then
            if (push_force_to_remote_gh) then
              if (return_previous_branch) then
                clean_docs_folder
              fi
            fi
          fi
        fi
      fi
    fi
  fi
fi
