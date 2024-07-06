
const render = (container, historyData) => {

  container.selectAll("*").remove();

  // 0. HEADER ---------------------------------
  container.classed("text-xs m-3", true);

  container
    .append("h1")
    .classed("mb-3", true)
    .append("b")
    .classed("border-b", true)
    .text("Habit tracker");


  // 1. MONTHS ---------------------------------
  // header row with days of the month
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthsRow = container
    .append("div")
    .classed("header", true)
    .classed("flex gap-1 items-center", true);

  monthsRow
    .append("div")
    .classed("w-48", true)
    .text("MONTH");

  monthsRow
    .append("div").classed("flex gap-1 items-center justify-around flex-1", true)
    .selectAll("div.month")
    .data(MONTHS)
    .enter()
    .append("div")
    .classed("month", true)
    .classed("text-black", d => {
      const currentMonth = new Date().getMonth();
      const monthIndex = MONTHS.indexOf(d);
      return monthIndex === currentMonth;
    })
    .text((d) => d);
  
  // 2. DAYS ---------------------------------
  const generate31Days = (selection) => { 
    const history = selection.append("div").classed("history", true)
    .classed("flex gap-1 items-center justify-around flex-1", true);
    history.selectAll("div.day")
      .data(d3.range(1, 32).map((d) => d.toString()))
      .enter()
      .append("div")
      .classed("day", true)
      .classed("text-black", d => {
        const currentDay = new Date().getDate();
        return d == currentDay;
      })
      .text((d) => d);
  }

  const days = container.append("div").classed("header", true)
    .classed("border-t flex gap-1 items-center", true);

  days.append("div").classed("w-48", true).text("HABIT");
  generate31Days(days);

  // 3. HABITS ---------------------------------
  // habits
  const habits = container.append("div").classed("habits", true).classed("border-t pt-1 flex flex-col gap-1", true);
  const habitRow = habits
    .selectAll("div")
    .data(historyData)
    .enter()
    .append("div")
    .classed("habit", true)
    .classed("flex gap-1 items-center", true); 


  const habitTitle = habitRow
    .append("div")
    .classed("w-48 flex gap-1 items-center", true)
  
  habitTitle
    .append("span")
    .classed("mr-0.5 opacity-20 hover:opacity-100 hover:cursor-pointer", true)
    .html('<i class="fa-solid fa-grip-lines"></i>')

  habitTitle
    .append("span")
    .classed("mr-0.5 opacity-20 hover:opacity-100 hover:cursor-pointer", true)
    .html('<i class="fa-solid fa-xmark"></i>')

  habitTitle.append("h2")
    .classed("w-full", true)
    .append("input")
    .attr("type", "text")
    .classed("w-full border-b border-dashed bg-transparent", true)
    .attr("value", (d) => d.name);
  
  const history = habitRow.append("div").classed("history", true)
    .classed("flex gap-1 items-center justify-around flex-1", true);

    history
      .selectAll("div.day")
      .data(d3.range(1, 32).map((d) => d.toString())) 
      .enter()
      .append("div")
      .classed("day", true)
      .classed("border", true)
      .classed("border-gray-400", d => {
        const currentDay = new Date().getDate();
        return d == currentDay;
      })
      .classed("hover:bg-gray-200 transition-all duration-100 hover:cursor-pointer hover:scale-110", true)
      // .text((d) => d)
      .on("click", function (d) {
        // if this is already active, remove it
        // if not, add it
        //
        d3.select(this).node().classList.toggle("bg-orange-400");
        // d.count++;
        // localStorage.setItem("behaviours", JSON.stringify(behaviours));
      });

  // 4. MERGE DATA ---------------------------------
  // go through all dates to see if there is a match
  // if there is a match, change the class of the div to "day active"
  

  // 5. FOOTER ---------------------------------
  const footer = container.append("div").classed("footer", true).classed("border-t pt-1 mt-1", true);
  // add 5 more 
  const addHabit = footer.append("div").classed("flex gap-1 items-center", true);
  addHabit.append("button").text("+ Add habit").classed("btn btn-sm", true)
    .on("click", () => {
      historyData.push({ name: "New habit", history: [] });
      render(container, historyData);
    });

;

};

export default render;