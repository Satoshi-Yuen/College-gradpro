window.nicePage = {
    table: "div",
    bar: "bar",
    limit: "10",
    color: "#1E9FFF",
    layout: ["count", "prev", "page", "next", "limit", "skip"],
    setCfg: function (b) {
        nicePage.table = b.table;
        nicePage.bar = b.bar;
        nicePage.limit = b.limit;
        nicePage.color = b.color;
        nicePage.layout = b.layout
    },
    returnHtml: function (g, e) {
        var h = '<table class="layui-table" lay-size="sm"><colgroup>';
        for (var f in e) {
            h += " <col width=" + e[f] + ">"
        }
        h += " </colgroup><thead><tr>";
        for (var f in g) {
            h += "  <th>" + g[f] + "</th>"
        }
        h += " </tr></thead> <tbody>";
        return h
    },
    returnList: function (j) {
        var h = new Array();
        for (var f in j) {
            var i = "";
            for (var g in j[f]) {
                i += j[f][g] + "_"
            }
            i = i.substring(0, i.length - 1);
            h.push(i)
        }
        return h
    },
    returnTable: function (e) {
        var h = e.split("_");
        var btnflag, signflag
        var g = "<tr>";
        for (var f in h) {
            if(f == 6) btnflag = 1
            else if(f == 4) btnflag = 2
            else if(f == 5) btnflag = 3
            if(h[f] == "未报名"){
                signflag = 0
                continue
            }
            else if(h[f] == "取消报名"){
                signflag = 4
                continue
            }
            g += "<td>" + h[f] + "</td>"
        }
        if(btnflag == 1) {
            if(signflag == 0) g += "<td><button id='signupac'>我要报名</button></td>"
            else g += "<td><button id='signupaccancel'>取消报名</button></td>"
        }
        else if(btnflag == 2) {
            if(signflag == 0) g += "<td><button id='signupnormal'>我要报名</button></td>"
            else g += "<td><button id='signupnormalcancel'>取消报名</button></td>"
        }
        else if(btnflag == 3) {
            if(signflag == 0) g += "<td><button id='signupstaff'>我要报名</button></td>"
            else g += "<td><button id='signupstaffcancel'>取消报名</button></td>"
        }
        g += "</tr>";
        return g
    }
};
$(function () {
    layui.use("laypage", function () {
        var a = layui.laypage;
        a.render({
            elem: nicePage.bar,
            limit: nicePage.limt,
            theme: nicePage.color,
            count: json.length,
            layout: nicePage.layout,
            jump: function (b) {
                document.getElementById(nicePage.table).innerHTML = function () {
                    var c = [nicePage.returnHtml(nameList, widthList)],
                        d = nicePage.returnList(json).concat().splice(b.curr * b.limit - b.limit, b.limit);
                    layui.each(d, function (e, g) {
                        var f = nicePage.returnTable(g);
                        c.push(f)
                    });
                    c.push(" </tbody></table></br>");
                    return c.join("")
                }()
            }
        })
    })
});