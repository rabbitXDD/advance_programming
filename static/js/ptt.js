$(document).ready(function() {
    path = 'http://localhost:5000/'
    $('#menu').on('change', function(){ 
        var value = $(this).val();

        path = path + value
        alert(path);
        window.location.href = path;
    }); 
    var death_rate = [38,69,72,42,58,87];

    $.getScript("//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js", function(){
        d3.select("body").select('div').data(death_rate)
            .enter()
            .append("div").text(
                function(d){
                    return d;
            }).style({
                'color':function(d){
                    if(d<60){
                        return 'red'
                    }
                },
                'width':function(d){
                    return d+'px'
                },
                'margin':'2px 0',
                'background':'#aaa',
            });
    });
    $.getScript("http://d3js.org/d3.v3.min.js", function(){
        var diameter = 960,
            format = d3.format(",d"),
            color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("body").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        d3.json("/static/flare.json", function(error, root) {
          if (error) throw error;

          var node = svg.selectAll(".node")
              .data(bubble.nodes(classes(root))
              .filter(function(d) { return !d.children; }))
            .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          node.append("title")
              .text(function(d) { return d.className + ": " + format(d.value); });

          node.append("circle")
              .attr("r", function(d) { return d.r; })
              .style("fill", function(d) { return color(d.packageName); });

          node.append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.className.substring(0, d.r / 3); });
        });

        // Returns a flattened hierarchy containing all leaf nodes under the root.
        function classes(root) {
          var classes = [];

          function recurse(name, node) {
            if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
            else classes.push({packageName: name, className: node.name, value: node.size});
          }

          recurse(null, root);
          return {children: classes};
        }

        d3.select(self.frameElement).style("height", diameter + "px");
    });
});