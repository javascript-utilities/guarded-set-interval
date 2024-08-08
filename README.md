# Guarded Set Interval
[heading__top]:
  #guarded-set-interval
  "&#x2B06; Set interval wrapper with re-entry guard"


Set interval wrapper with re-entry guard, I.E. if a callback takes longer than
defined interval it'll skip execution for a tick or few.

## [![Byte size of Guarded Set Interval][badge__main__guarded_set_interval__source_code]][guarded_set_interval__main__source_code] [![Open Issues][badge__issues__guarded_set_interval]][issues__guarded_set_interval] [![Open Pull Requests][badge__pull_requests__guarded_set_interval]][pull_requests__guarded_set_interval] [![Latest commits][badge__commits__guarded_set_interval__main]][commits__guarded_set_interval__main]   [![GitHub Actions Build Status][badge__github_actions]][activity_log__github_actions] [![License][badge__license]][branch__current__license]


---


- [:arrow_up: Top of Document][heading__top]
- [:building_construction: Requirements][heading__requirements]
- [:zap: Quick Start][heading__quick_start]
- [&#x1F9F0; Usage][heading__usage]
- [&#x1F5D2; Notes][heading__notes]
- [:chart_with_upwards_trend: Contributing][heading__contributing]
  - [:trident: Forking][heading__forking]
  - [:currency_exchange: Sponsor][heading__sponsor]
- [:card_index: Attribution][heading__attribution]
- [:balance_scale: Licensing][heading__license]
  - [Commercial and/or proprietary use][heading__commercial_andor_proprietary_use]
  - [Non-commercial and FOSS use][heading__noncommercial_and_foss_use]


---



## Requirements
[heading__requirements]:
  #requirements
  "&#x1F3D7; Prerequisites and/or dependencies that this project needs to function properly"


NodeJS dependencies may be installed via NPM...


```Bash
npm install @javascript-utilities/guarded-set-interval
```


______


## Quick Start
[heading__quick_start]:
  #quick-start
  "&#9889; Perhaps as easy as one, 2.0,..."


Clone this project...


**Linux/MacOS**


```Bash
mkdir -vp ~/git/hub/javascript-utilities

cd ~/git/hub/javascript-utilities

git clone git@github.com:javascript-utilities/guarded-set-interval.git
```


______


## Usage
[heading__usage]:
  #usage
  "&#x1F9F0; How to utilize this repository"


```typescript
import { Guarded_Set_Interval } from '@javascript-utilities/guarded-set-interval';

const shared_state = { callback_count: 0 };

const callback = {
  next: (...args) => {
    console.log('callback args:', args);
    shared_state.count++;
    if (shared_state.count > 3) {
      return { done: true, value: shared_state.count };
    }
    return { done: false, value: shared_state.count };
  }
};

const interval = new Guarded_Set_Interval({
  callback,
  args: ['foo', 'bar'],
  milliseconds: 1000,
  verbose: true,
});

interval.start();

// ... Do other stuff...

interval.stop();
```

______


## Notes
[heading__notes]:
  #notes
  "&#x1F5D2; Additional things to keep in mind when developing"


This repository may not be feature complete and/or fully functional, Pull
Requests that add features or fix bugs are certainly welcomed.



______


## Contributing
[heading__contributing]:
  #contributing
  "&#x1F4C8; Options for contributing to guarded-set-interval and javascript-utilities"


Options for contributing to guarded-set-interval and javascript-utilities


---


### Forking
[heading__forking]:
  #forking
  "&#x1F531; Tips for forking guarded-set-interval"


> :warning: Creating fork(s), submitting contribution(s), publishing derivative
> work(s), etc. based on this repository will form an agreement to be bound by
> the use-cased based [licensing][heading__license] sub-sections.
>
> I.E. if you choose to contribute to or use this project, you acknowledge and
> accept these usage based licensing terms will apply to any such works too.

Start making a [Fork][guarded_set_interval__fork_it] of this repository to an
account that you have write permissions for.


- Add remote for fork URL. The URL syntax is
  _`git@github.com:<NAME>/<REPO>.git`_...


```Bash
cd ~/git/hub/javascript-utilities/guarded-set-interval

git remote add fork git@github.com:<NAME>/guarded-set-interval.git
```


- Commit your changes and push to your fork, eg. to fix an issue...


```Bash
cd ~/git/hub/javascript-utilities/guarded-set-interval


git commit -F- <<'EOF'
:bug: Fixes #42 Issue


**Edits**


- `<SCRIPT-NAME>` script, fixes some bug reported in issue
EOF


git push fork main
```


> Note, the `-u` option may be used to set `fork` as the default remote, eg.
> _`git push -u fork main`_ however, this will also default the `fork` remote
> for pulling from too! Meaning that pulling updates from `origin` must be done
> explicitly, eg. _`git pull origin main`_


- Then on GitHub submit a Pull Request through the Web-UI, the URL syntax is
  _`https://github.com/<NAME>/<REPO>/pull/new/<BRANCH>`_


> Note; to decrease the chances of your Pull Request needing modifications
> before being accepted, please check the
> [dot-github](https://github.com/javascript-utilities/.github) repository for
> detailed contributing guidelines.


---


### Sponsor
  [heading__sponsor]:
  #sponsor
  "&#x1F4B1; Methods for financially supporting javascript-utilities that maintains guarded-set-interval"


Thanks for even considering it!


Via Liberapay you may
<sub>[![sponsor__shields_io__liberapay]][sponsor__link__liberapay]</sub> on a
repeating basis.


Regardless of if you're able to financially support projects such as
guarded-set-interval that javascript-utilities maintains, please consider
sharing projects that are useful with others, because one of the goals of
maintaining Open Source repositories is to provide value to the community.


______


## Attribution
[heading__attribution]:
  #attribution
  "&#x1F4C7; Resources that where helpful in building this project so far."


- [GitHub -- `github-utilities/make-readme`](https://github.com/github-utilities/make-readme)


______


## License
[heading__license]:
  #license
  "&#x2696; Legal side of Open Source"


This project is licensed based on use-case


---


### Commercial and/or proprietary use
[heading__commercial_andor_proprietary_use]: #commercial-andor-proprietary-use


If a project is **either** commercial or (`||`) proprietary, then please
contact the author for pricing and licensing options to make use of code and/or
features from this repository.


---


### Non-commercial and FOSS use
[heading__noncommercial_and_foss_use]: #noncommercial-and-foss-use


If a project is **both** non-commercial and (`&&`) published with a license
compatible with AGPL-3.0, then it may utilize code from this repository under
the following terms.


```
Set interval wrapper with re-entry guard
Copyright (C) 2024 S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

```


For further details review full length version of
[AGPL-3.0][branch__current__license] License.



[branch__current__license]:
  /LICENSE
  "&#x2696; Full length version of AGPL-3.0 License"

[badge__license]:
  https://img.shields.io/github/license/javascript-utilities/guarded-set-interval

[badge__commits__guarded_set_interval__main]:
  https://img.shields.io/github/last-commit/javascript-utilities/guarded-set-interval/main.svg

[commits__guarded_set_interval__main]:
  https://github.com/javascript-utilities/guarded-set-interval/commits/main
  "&#x1F4DD; History of changes on this branch"

[guarded_set_interval__community]:
  https://github.com/javascript-utilities/guarded-set-interval/community
  "&#x1F331; Dedicated to functioning code"

[issues__guarded_set_interval]:
  https://github.com/javascript-utilities/guarded-set-interval/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."

[guarded_set_interval__fork_it]:
  https://github.com/javascript-utilities/guarded-set-interval/fork
  "&#x1F531; Fork it!"

[pull_requests__guarded_set_interval]:
  https://github.com/javascript-utilities/guarded-set-interval/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"

[guarded_set_interval__main__source_code]:
  https://github.com/javascript-utilities/guarded-set-interval/
  "&#x2328; Project source!"

[badge__issues__guarded_set_interval]:
  https://img.shields.io/github/issues/javascript-utilities/guarded-set-interval.svg

[badge__pull_requests__guarded_set_interval]:
  https://img.shields.io/github/issues-pr/javascript-utilities/guarded-set-interval.svg

[badge__main__guarded_set_interval__source_code]:
  https://img.shields.io/github/repo-size/javascript-utilities/guarded-set-interval

[sponsor__shields_io__liberapay]:
  https://img.shields.io/static/v1?logo=liberapay&label=Sponsor&message=javascript-utilities

[sponsor__link__liberapay]:
  https://liberapay.com/javascript-utilities
  "&#x1F4B1; Sponsor developments and projects that javascript-utilities maintains via Liberapay"

[badge__github_actions]:
  https://github.com/javascript-utilities/guarded-set-interval/actions/workflows/test.yaml/badge.svg?branch=main

[activity_log__github_actions]:
  https://github.com/javascript-utilities/guarded-set-interval/deployments/activity_log

