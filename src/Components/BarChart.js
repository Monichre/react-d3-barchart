import React, {Component} from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';


class BarChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            yScale: '',
            xScale: ''
        }
    }

    setYScale(){
        let y = d3.scaleLinear()
            .domain([0, d3.max(this.state.data)])
            .range([0, this.props.height]);

        this.setState({yScale: y});
    }

    setXScale(){
        let x = d3.scaleBand()
            .domain(d3.range(0, this.state.data.length))
            .range([0, this.props.width]);

        this.setState({xScale: x});
    }

    static defaultProps = {
        height: 500,
        width: 500,
        chartBg: '#eee',
        barColor: 'steelBlue',
        barWidth: 40,
        barOffset: 5
    }

    // Life Cycle Methods
    componentWillMount(){
        this.setYScale();
        this.setXScale();
    }

    render() {
        const chart = ReactFauxDOM.createElement('div');

        d3.select(chart).append('svg')
            .attr('width', this.props.width)
            .attr('height', this.props.height)
            .style('background', this.props.chartBg)
            .selectAll('rect')
            .data(this.state.data)
            .enter().append('rect')
                .style('fill', this.props.barColor)
                .attr('width', this.props. barWidth)
                .attr('height', (d) => {
                    return this.state.yScale(d); //This should return the data from the parent state
                })
                .attr('x', (d, i) => {
                    // return i * (this.props.barWidth + this.props.barOffset)
                    return this.state.xScale(i);
                })
                .attr('y', (d) => {
                    return this.props.height - this.state.yScale(d);
                })

        return chart.toReact();
    }
}

export default BarChart;
