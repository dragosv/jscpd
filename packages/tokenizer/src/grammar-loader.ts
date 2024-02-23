import * as reprism from 'reprism';

import * as abap from 'reprism/languages/abap.js';
import * as actionscript from 'reprism/languages/actionscript.js';
import * as ada from 'reprism/languages/ada.js';
import * as apacheconf from 'reprism/languages/apacheconf.js';
import * as apl from 'reprism/languages/apl.js';
import * as applescript from 'reprism/languages/applescript.js';
import * as arff from 'reprism/languages/arff.js';
import * as asciidoc from 'reprism/languages/asciidoc.js';
import * as asm6502 from 'reprism/languages/asm6502.js';
import * as aspnet from 'reprism/languages/aspnet.js';
import * as autohotkey from 'reprism/languages/autohotkey.js';
import * as autoit from 'reprism/languages/autoit.js';
import * as bash from 'reprism/languages/bash.js';
import * as basic from 'reprism/languages/basic.js';
import * as batch from 'reprism/languages/batch.js';
import * as brainfuck from 'reprism/languages/brainfuck.js';
import * as bro from 'reprism/languages/bro.js';
import * as c from 'reprism/languages/c.js';
import * as clike from 'reprism/languages/clike.js';
import * as clojure from 'reprism/languages/clojure.js';
import * as coffeescript from 'reprism/languages/coffeescript.js';
import * as cpp from 'reprism/languages/cpp.js';
import * as csharp from 'reprism/languages/csharp.js';
import * as csp from 'reprism/languages/csp.js';
import * as cssExtras from 'reprism/languages/css-extras.js';
import * as css from 'reprism/languages/css.js';
import * as d from 'reprism/languages/d.js';
import * as dart from 'reprism/languages/dart.js';
import * as diff from 'reprism/languages/diff.js';
import * as django from 'reprism/languages/django.js';
import * as docker from 'reprism/languages/docker.js';
import * as eiffel from 'reprism/languages/eiffel.js';
import * as elixir from 'reprism/languages/elixir.js';
import * as erlang from 'reprism/languages/erlang.js';
import * as flow from 'reprism/languages/flow.js';
import * as fortran from 'reprism/languages/fortran.js';
import * as fsharp from 'reprism/languages/fsharp.js';
import * as gedcom from 'reprism/languages/gedcom.js';
import * as gherkin from 'reprism/languages/gherkin.js';
import * as git from 'reprism/languages/git.js';
import * as glsl from 'reprism/languages/glsl.js';
import * as go from 'reprism/languages/go.js';
import * as graphql from 'reprism/languages/graphql.js';
import * as groovy from 'reprism/languages/groovy.js';
import * as haml from 'reprism/languages/haml.js';
import * as handlebars from 'reprism/languages/handlebars.js';
import * as haskell from 'reprism/languages/haskell.js';
import * as haxe from 'reprism/languages/haxe.js';
import * as hpkp from 'reprism/languages/hpkp.js';
import * as hsts from 'reprism/languages/hsts.js';
import * as http from 'reprism/languages/http.js';
import * as ichigojam from 'reprism/languages/ichigojam.js';
import * as icon from 'reprism/languages/icon.js';
import * as inform7 from 'reprism/languages/inform7.js';
import * as ini from 'reprism/languages/ini.js';
import * as io from 'reprism/languages/io.js';
import * as j from 'reprism/languages/j.js';
import * as java from 'reprism/languages/java.js';
import * as javascript from 'reprism/languages/javascript.js';
import * as jolie from 'reprism/languages/jolie.js';
import * as json from 'reprism/languages/json.js';
import * as jsx from 'reprism/languages/jsx.js';
import * as julia from 'reprism/languages/julia.js';
import * as keyman from 'reprism/languages/keyman.js';
import * as kotlin from 'reprism/languages/kotlin.js';
import * as latex from 'reprism/languages/latex.js';
import * as less from 'reprism/languages/less.js';
import * as liquid from 'reprism/languages/liquid.js';
import * as lisp from 'reprism/languages/lisp.js';
import * as livescript from 'reprism/languages/livescript.js';
import * as lolcode from 'reprism/languages/lolcode.js';
import * as lua from 'reprism/languages/lua.js';
import * as makefile from 'reprism/languages/makefile.js';
import * as markdown from 'reprism/languages/markdown.js';
import * as markupTemplating from 'reprism/languages/markup-templating.js';
import * as markup from 'reprism/languages/markup.js';
import * as matlab from 'reprism/languages/matlab.js';
import * as mel from 'reprism/languages/mel.js';
import * as mizar from 'reprism/languages/mizar.js';
import * as monkey from 'reprism/languages/monkey.js';
import * as n4js from 'reprism/languages/n4js.js';
import * as nasm from 'reprism/languages/nasm.js';
import * as nginx from 'reprism/languages/nginx.js';
import * as nim from 'reprism/languages/nim.js';
import * as nix from 'reprism/languages/nix.js';
import * as nsis from 'reprism/languages/nsis.js';
import * as objectivec from 'reprism/languages/objectivec.js';
import * as ocaml from 'reprism/languages/ocaml.js';
import * as opencl from 'reprism/languages/opencl.js';
import * as oz from 'reprism/languages/oz.js';
import * as parigp from 'reprism/languages/parigp.js';
import * as parser from 'reprism/languages/parser.js';
import * as pascal from 'reprism/languages/pascal.js';
import * as perl from 'reprism/languages/perl.js';
import * as phpExtras from 'reprism/languages/php-extras.js';
import * as php from 'reprism/languages/php.js';
import * as powershell from 'reprism/languages/powershell.js';
import * as processing from 'reprism/languages/processing.js';
import * as prolog from 'reprism/languages/prolog.js';
import * as properties from 'reprism/languages/properties.js';
import * as protobuf from 'reprism/languages/protobuf.js';
import * as pug from 'reprism/languages/pug.js';
import * as puppet from 'reprism/languages/puppet.js';
import * as pure from 'reprism/languages/pure.js';
import * as python from 'reprism/languages/python.js';
import * as q from 'reprism/languages/q.js';
import * as qore from 'reprism/languages/qore.js';
import * as r from 'reprism/languages/r.js';
import * as reason from 'reprism/languages/reason.js';
import * as renpy from 'reprism/languages/renpy.js';
import * as rest from 'reprism/languages/rest.js';
import * as rip from 'reprism/languages/rip.js';
import * as roboconf from 'reprism/languages/roboconf.js';
import * as ruby from 'reprism/languages/ruby.js';
import * as rust from 'reprism/languages/rust.js';
import * as sas from 'reprism/languages/sas.js';
import * as sass from 'reprism/languages/sass.js';
import * as scala from 'reprism/languages/scala.js';
import * as scheme from 'reprism/languages/scheme.js';
import * as scss from 'reprism/languages/scss.js';
import * as smalltalk from 'reprism/languages/smalltalk.js';
import * as smarty from 'reprism/languages/smarty.js';
import * as soy from 'reprism/languages/soy.js';
import * as stylus from 'reprism/languages/stylus.js';
import * as swift from 'reprism/languages/swift.js';
import * as tcl from 'reprism/languages/tcl.js';
import * as textile from 'reprism/languages/textile.js';
import * as tsx from 'reprism/languages/tsx.js';
import * as twig from 'reprism/languages/twig.js';
import * as typescript from 'reprism/languages/typescript.js';
import * as vbnet from 'reprism/languages/vbnet.js';
import * as velocity from 'reprism/languages/velocity.js';
import * as verilog from 'reprism/languages/verilog.js';
import * as vhdl from 'reprism/languages/vhdl.js';
import * as vim from 'reprism/languages/vim.js';
import * as visualBasic from 'reprism/languages/visual-basic.js';
import * as wasm from 'reprism/languages/wasm.js';
import * as wiki from 'reprism/languages/wiki.js';
import * as xeora from 'reprism/languages/xeora.js';
import * as xojo from 'reprism/languages/xojo.js';
import * as yaml from 'reprism/languages/yaml.js';
import * as tap from './languages/tap.js';
import * as sql from './languages/sql.js';
import * as plsql from './languages/plsql.js';

export const languages = {
  abap, actionscript, ada, apacheconf, apl, applescript, arff,
  asciidoc, asm6502, aspnet, autohotkey, autoit, bash, basic, batch,
  brainfuck, bro, c, clike, clojure, coffeescript, cpp, csharp, csp, cssExtras,
  css, d, dart, diff, django, docker, eiffel, elixir, erlang, flow, fortran, fsharp,
  gedcom, gherkin, git, glsl, go, graphql, groovy, haml, handlebars, haskell, haxe,
  hpkp, hsts, http, ichigojam, icon, inform7, ini, io, j, java, javascript, jolie,
  json, jsx, julia, keyman, kotlin, latex, less, liquid, lisp, livescript,
  lolcode, lua, makefile, markdown, markupTemplating, markup, matlab, mel, mizar,
  monkey, n4js, nasm, nginx, nim, nix, nsis, objectivec, ocaml, opencl, oz, parigp,
  parser, pascal, perl, php, phpExtras, powershell, processing, prolog,
  properties, protobuf, pug, puppet, pure, python, q, qore, r, reason, renpy, rest,
  rip, roboconf, ruby, rust, sas, sass, scala, scheme, scss, smalltalk, smarty, soy,
  stylus, swift, tcl, textile, twig, typescript, vbnet, velocity, verilog, vhdl,
  vim, visualBasic, wasm, wiki, xeora, xojo, yaml, tsx, sql, plsql, tap
};

export const loadLanguages = (): void => {
  reprism.loadLanguages(Object.values(languages).map(v => v.default));
}

