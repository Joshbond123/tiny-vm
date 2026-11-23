# tiny-vm

A tiny stack VM for make.fun's `tiny-stack-vm-01` bounty: runs each instance's `program.bin` on
its `input.bin` and writes `stdout.bin` and `exit.txt`, exactly as `ISA.md` states.

`main.ts` (Node 22, no dependencies) reads `/input/<id>/`, writes `/output/<id>/`.

Local run:

```sh
MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts
```
