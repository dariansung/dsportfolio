import React, { Component } from 'react';
import config from '../config';
const firebase = require('firebase');
const d3 = require('d3');

export class Graph extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        let nodes = [];
        let links = [];

        let ref = firebase.database().ref('movies');
        ref.on('value', snapshot => {
            // Prepare nodes
            snapshot.forEach(child => {
                let inGraph = false;
                firebase.database().ref('movies/' + child.val().imdbId + '/lists').on('value', listSnap => {
                    listSnap.forEach(list => {
                        if(list.key === "GraphViz")
                            inGraph = true;
                    })
                })

                if(inGraph){
                    let actorsArr = this.parseActors(child.val().actors);
                    nodes.push({
                        name: child.val().title,
                        group: 1,
                        actors: actorsArr,
                        poster: child.val().poster,
                        id: child.val().imdbId
                    })
    
                    actorsArr.forEach(actor => {
                        let isDuplicate = false;
                        nodes.forEach(node => {
                            if(node.name === actor)
                                isDuplicate = true;
                        })
                        if(!isDuplicate)
                            nodes.push({
                                name: actor,
                                group: 2
                            });
                    })
                }
            })

            // Prepare links
            for(let i = 0; i < nodes.length; i++){
                if(nodes[i].group === 2){
                    for(let j = 0; j < nodes.length; j++){
                        let inMovie = false;
                        if(nodes[j].group === 1){
                            nodes[j].actors.forEach(actor => {
                                if(actor === nodes[i].name)
                                    inMovie = true;
                            })
                        }
                        if(inMovie){
                            links.push({
                                source: i,
                                target: j,
                                value: 1
                            })
                        }
                    }
                }
            }

            // Add SVG element
            const width = 1980;
            const height = 1080;

            const obj_links = links.map(d => Object.create(d));
            const obj_nodes = nodes.map(d => Object.create(d));

            const svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, height]);

            const link = svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(obj_links)
                .join("line")
                .attr("stroke-width", d => Math.sqrt(d.value))

            const radius = (node) => {
                if(node.group === 1)
                    return 100;
                return 50;
            }
            
            const nodeFill = (node) => {
                if(node.group === 1)
                    return "url(#" + node.id + ")";
                return d3.color("steelblue");
            }

            let defs = svg.append("svg:defs");
            nodes.forEach(node => {
                if(node.group === 1){
                    defs.append("svg:pattern")
                        .attr("id", node.id)
                        .attr("width", 1)
                        .attr("height", 1)
                        .append("svg:image")
                        .attr("xlink:href", node.poster)
                        .attr("width", 200)
                        .attr("height", 300)
                        .attr("x", 0)
                        .attr("y", -50)
                }
            })

            const simulation = d3.forceSimulation(obj_nodes)
                .force("link", d3.forceLink().links(links).id(d => { return d.index }).distance(200))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2))
            
            const node = svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(obj_nodes)
                .join("circle")
                .attr("r", radius)
                .style("fill", nodeFill)
                .call(this.drag(simulation))

            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y)

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
            })

            node.append("title")
                .text(function(d){ return d.name; })

            const elem = document.getElementById("graph-main");
            elem.appendChild(svg.node());
        })

    }

    drag = (simulation) => {
        function dragStarted(d){
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d){
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d){
            if(!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
    }

    parseActors(actorsStr){
        let actors = [];
        while(actorsStr.indexOf(",") !== -1){
            let commaIndex = actorsStr.indexOf(",");
            actors.push(actorsStr.substring(0, commaIndex));
            actorsStr = actorsStr.substring(commaIndex + 2);
        }
        if(actorsStr !== "")
            actors.push(actorsStr);
        return actors;
    }

    render(){
        return(
            <div className="graph-main" id="graph-main">

            </div>
        )
    }
}

export default Graph;