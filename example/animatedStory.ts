import { RecursivePartial, NodeOptions, EdgeOptions } from "dagre-reactjs";

type DataType = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
};
export const animateStory = (
  steps: string[][][],
  interFrameTime: number,
  callback: (data: DataType) => void,
  getData: () => DataType
): number => {
  const animateFrame = (step: string[][]) => {
    const data = JSON.parse(JSON.stringify(getData()));

    step.forEach(x => {
      switch (x[0]) {
        case "setActivity":
          data.nodes.push({
            id: x[1],
            label: x[1],
            styles: {
              node: {
                padding: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15
                }
              },
        shape: {
                styles: { fill: "#fff", stroke: "#000" },
                className: "n",
              }
            },
          });
          break;
        case "removeNode":
          let index3 = data.edges.findIndex(
            (v: EdgeOptions) => v.from === x[1] || v.to === x[1]
          );
          while (index3 !== -1) {
            data.edges.splice(index3, 1);
            index3 = data.edges.findIndex(
              (v: EdgeOptions) => v.from === x[1] || v.to === x[1]
            );
          }
          const index = data.nodes.findIndex((v: NodeOptions) => v.id === x[1]);
          data.nodes.splice(index, 1);
          break;
        case "setMilestone":
          data.nodes.push({
            id: x[1],
            shape: "diamond",
            styles: {
              node: {
                padding: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15
                }
              },
              shape: {
                styles: { fill: "#fff", stroke: "#000" },
                className: "n"
              }
            },
            label: x[1]
          });
          break;
        case "AddCoherenceEdge":
          data.edges.push({ from: x[1], to: x[2] });
          break;
        case "AddDependencyEdge":
          data.edges.push({ from: x[1], to: x[2], label: "added" });
          break;
        case "MakeRedundantEdge":
          const index4 = data.edges.findIndex(
            (v: EdgeOptions) => v.from === x[1] && v.to === x[2]
          );
          data.edges.splice(index4, 1);
          data.edges.push({
            from: x[1],
            to: x[2],
            styles: {
              label: {
                styles: { stroke: "#aaa" }
              },
              edge: {
                styles: {
                  stroke: "#aaa",
                  strokeDasharray: "5, 10",
                  fillOpacity: "0"
                }
              },
              marker: {
                styles: { fill: "#aaa" }
              }
            },
            label: "pruned"
          });
          break;
        case "RemoveEdge":
          const index2 = data.edges.findIndex(
            (v: EdgeOptions) => v.from === x[1] && v.to === x[2]
          );
          data.edges.splice(index2, 1);
          break;

        default:
          console.log("Schedule Network element " + x + " is not implemented");
      }
    });
    callback(data);
  };

  let index = 0;
  return window.setInterval(() => {
    if (index < steps.length) {
      const step = steps[index];
      animateFrame(step);
      index += 1;
    }
  }, interFrameTime);
};

export const steps = [
  [["setActivity", "Project"]],
  [
    ["removeNode", "Project"],
    ["setMilestone", "Project Finish"],
    ["setMilestone", "Project Start"],
    ["setActivity", "A"],
    ["setActivity", "B"],
    ["AddCoherenceEdge", "Project Start", "A"],
    ["AddCoherenceEdge", "Project Start", "B"],
    ["AddCoherenceEdge", "A", "Project Finish"],
    ["AddCoherenceEdge", "B", "Project Finish"]
  ],
  [
    ["removeNode", "A"],
    ["setMilestone", "A Start"],
    ["setActivity", "A.1"],
    ["setActivity", "A.2"],
    ["setMilestone", "A Finish"],
    ["AddCoherenceEdge", "A Start", "A.1"],
    ["AddCoherenceEdge", "A Start", "A.2"],
    ["AddCoherenceEdge", "A.1", "A Finish"],
    ["AddCoherenceEdge", "A.2", "A Finish"],
    ["AddCoherenceEdge", "Project Start", "A Start"],
    ["AddCoherenceEdge", "A Finish", "Project Finish"]
  ],
  [
    ["removeNode", "A.2"],
    ["setMilestone", "A.2 Start"],
    ["setActivity", "A.2.1"],
    ["setActivity", "A.2.2"],
    ["setActivity", "A.2.3"],
    ["setMilestone", "A.2 Finish"],
    ["AddCoherenceEdge", "A.2 Start", "A.2.1"],
    ["AddCoherenceEdge", "A.2 Start", "A.2.2"],
    ["AddCoherenceEdge", "A.2 Start", "A.2.3"],
    ["AddCoherenceEdge", "A.2.1", "A.2 Finish"],
    ["AddCoherenceEdge", "A.2.2", "A.2 Finish"],
    ["AddCoherenceEdge", "A.2.3", "A.2 Finish"],
    ["AddCoherenceEdge", "A Start", "A.2 Start"],
    ["AddCoherenceEdge", "A.2 Finish", "A Finish"]
  ],
  [["AddDependencyEdge", "A.1", "A.2 Start"]],
  [["MakeRedundantEdge", "A Start", "A.2 Start"]],
  [["MakeRedundantEdge", "A.1", "A Finish"]],
  [["RemoveEdge", "A Start", "A.2 Start"]],
  [["RemoveEdge", "A.1", "A Finish"]],
  [["AddDependencyEdge", "A.2.2", "A.2.3"]],
  [["MakeRedundantEdge", "A.2 Start", "A.2.3"]],
  [["MakeRedundantEdge", "A.2.2", "A.2 Finish"]],
  [["RemoveEdge", "A.2 Start", "A.2.3"]],
  [["RemoveEdge", "A.2.2", "A.2 Finish"]],
  [["AddDependencyEdge", "A.2.1", "B"]],
  [["MakeRedundantEdge", "Project Start", "B"]],
  [["RemoveEdge", "Project Start", "B"]]
];
