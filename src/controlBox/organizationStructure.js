import { organizationStructure } from './data';
import * as d3 from 'd3';

function wrap(textWordToBreak, width) {
    textWordToBreak.each(function () {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0;
        let tspan = text.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }

        }
        if (line.join(' ') === text.text()) {
            //folks who didn't breaked
            tspan.attr("y", (parseInt(y, 10) + 5).toString());
        }
    });
}

const initTree = () => {

    const nodeWidth = 220;
    const nodeHeight = 50;
    const lengthOfLine = 20;
    const horizontalSeparationBetweenNodes = 16;
    const verticalSeparationBetweenNodes = 128;
    var previousSelection = "";
    const screenWidth = window.innerWidth;
    const widthOffset = screenWidth*0.5;
    const screenHeight = window.innerHeight;
    const heightOffset = screenHeight*0.21;
    const svg = d3.select("#organization_tree")
        .append("svg")
        .attr("width", window.outerWidth)
        .attr("height", window.outerHeight)
        .append("g")
        .attr("transform", `translate(${widthOffset}, ${heightOffset})`);
    const tree = d3.tree().nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes]);
    const root = d3.hierarchy(organizationStructure);
    tree(root);


    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "150%");
    filter.append("feDropShadow")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("flood-color", "rgba(0,0,0,0.10)")
        .attr("stdDeviation", 5);

    svg.selectAll('path')
        .data(root.descendants().slice(1))
        .enter()
        .append('path')
        .attr("d", function (d) {
            const halfWidth = nodeWidth / 2;
            return `M${(d.x + halfWidth)},${d.y} L${(d.x + halfWidth)},${d.y - lengthOfLine} L${(d.parent.x + halfWidth)},${d.y - lengthOfLine} L${(d.parent.x + halfWidth)},${d.parent.y}`;
        })
        .style("fill", 'none')
        .attr("stroke", '#F7941D')
        .attr("stroke-width", "2");

    svg.selectAll("g")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return `translate(${d.x},${d.y})`
        })
        .append("rect")
        .attr("rx", 30)
        .attr("ry", 30)
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("filter", "url(#drop-shadow)")
        .style("fill", "#ffffff");

    svg.selectAll("g")
        .append("text")
        .text((d) => d.data.name)
        .attr("text-anchor", "middle")
        .attr("y", (d) => nodeHeight / 2)
        .attr("x", (d) => 140)
        .call(wrap, 110);

    svg.selectAll("g")
        .append("image")
        .attr("x", (d) => nodeWidth / 2 - 85)
        .attr("xlink:href", (d) => d.data.logo)
        .attr("height", "50px")
        .attr("width", "50px");
        
    svg.selectAll("g").on("click", function(x, y) {
        document.getElementById("organization_details").style.display = "";
        if(previousSelection!=="")
            document.getElementById(previousSelection).style.display = "none";
        document.getElementById(x.data.id).style.display = "";
        previousSelection = x.data.id;
          });
};

initTree();


