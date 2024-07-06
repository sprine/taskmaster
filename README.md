# Taskmaster

My localstorage-run habit tracker, heavily inspired by <a href="https://jamesclear.com/atomic-habits">_Atomic Habits_ by James Clear</a>.

Bookmark anshuweb.com/taskmaster. If you use it, do let me know!


## TODO

- [ ] schema definition of a task
- [ ] the calendar is set up automagically.
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
    title: String, # the name of the task
    active: Bool,  # whether the task is currently active
    stats: {       # stats are automatically updated
        total: Int,  
        last_date: Date,
        first_date: Date,
    },
    color: Color,  # optional
    group: String, # optional
    scribble: Bool, # whether to use the scribble effect to fill in the day 
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

## Pseudo-execution of the app 

### On first bootstrap
```
10  Setup the localstorage

100 Render calendar

200 Load tasks from localstorage
250 Render tasks

300 Register Events
    310 Click on a day
        311 Add task to day
        312 Remove task from day
    320 Click on a task
        321 Toggle task active
        322 Rename task
        323 Delete task
    330 Click on a task group
        331 Toggle group active
        332 Rename group
        333 Delete group
    340 Click on a task color
        341 Change task color
```
### On subsequent loads
```
100 Render calendar

200 Load tasks from localstorage
250 Render tasks

300 Register Events
    310 Click on a day
        311 Add task to day
        312 Remove task from day
    320 Click on a task
        321 Toggle task active
        322 Rename task
        323 Delete task
    330 Click on a task group
        331 Toggle group active
        332 Rename group
        333 Delete group
    340 Click on a task color
        341 Change task color
```

## Principles:
- exportable 
- simple
- fast!
- reliable
- fun

## Calendar

- [ ] Render the calendar

- [ ] Click on a day
- [ ] Hover over a day

- [ ] Click on a task
- [ ] Hover over a task

## App state 

```
{
    "createdAt": Date,
    "theme": "light",
    "name": "Taskmaster",
}
```