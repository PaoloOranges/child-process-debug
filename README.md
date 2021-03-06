# child-process-debug #

Convenience methods for debugging/inspect child processes in Node.JS. Child processes will be started with `--inspect` if the
parent was started with `--inspect` and the children will each get their own increasing port number based off the 
parent's port number. The default port is 9229. If you add `--inspect-brk` that will also get passed to the children.

## Example ##
```JS
var childProcessDebug = require('child-process-debug');

for (var i = 0; i < 4; i++) {
    //if this script wasn't run with --inspect this will spawn node example.js [0-3]
    //if this script was run with --inspect, this will spawn node --inspect=[9229-9233] example.js [0-3]
    childProcessDebug.spawn(['example.js', i]);
}
```

## Methods ##

### spawn([command][, args][, options]) ###
This takes the exact same arguments as `child_process.spawn` and if the parent had debugging turned on (via --inspect),
it'll turn on debugging for the spawned child. `command` is also optional (unlike `child_process.spawn`) and defaults
to `process.execPath`.

The ChildProcess returned from spawn will have a property called `debugPort` indicating the debug port chosen for that
child or undefined.

### fork(modulePath [, args][, options]) ###
This takes the exact same arguments as `child_process.fork` and if the parent had debugging turned on (via --inspect),
it'll turn on debugging for the spawned child. Return is the same as `spawn` above.

### nextPort() ###
Returns the next debug port that comes after the current process's debug port. If the current process doesn't have
debug turned on then this will return undefined. This is useful if you're not using `spawn` and want to specify the
`--inspect=port` argument yourself.

### exitWithParent(child) ###
Kill's the spawned child when the parent dies. This will not work if the parent is killed with SIGKILL.

### port() ###
Returns the current process's debug port or undefined if debug is not turned on.

### debugBreak() ###
Returns true if the current process has the flag `--inspect-brk`.

By [James Hartig](https://github.com/fastest963/)
Edit [Paolo Oranges](https://github.com/PaoloOranges/)
