# Taskmaster

My localstorage-run habit tracker, heavily inspired by <a href="https://jamesclear.com/atomic-habits">_Atomic Habits_ by James Clear</a>.

Bookmark anshuweb.com/taskmaster. If you use it, do let me know!


## TODO

- [ ] schema definition of a task
- [ ] the calendar is set up automagically. You can't go back on a month card.
- [ ] can create tasks/habits, rename them and delete them.

### Decisions 

- Keep using d3.js and a "simple" setup until I'm completely stuck.

### After:

- [ ] completing a daily task should feel good
- [ ] annotate
- [ ] export to backup. Excalidraw has proven that localstorage can be trusted.
- [ ] alternative visualizations


## Schema definition

```
task = {
    title: String,
    active: Bool,
    stats: {
        total: Int,
        last_date: Date,
        first_date: Date,
    },
}
```

Should tasks care about when they're performed, or should days care which tasks are performed on that day?

task A's days: june: [2, 3, 4, 22, 24, 25], july: [1, 5]
task B's days: june: [2]
then as day is rendered, lookup() => cache
only need to look up days since the last cache

```
ymd = {
    2024: {
        june: {
            1: [],
            2: [taskA, taskB],
            3: [taskA], 
            4: [taskA],
            5: [],
            6: [],
            7: [],
            ...
            22: [taskA],
            23: [],
            24: [taskA],
            25: [taskA],
            26: [],
            ...
        },
        july: {
            1: [taskA],
            2:  [],
            3:  [],
            4:  [],
            5:  [taskA],    // today
            6:  [],         // enable at midnight
        }
    }
}
```

Rerender every hour so that the day can be enabled at midnight.