let position = {
    x: 0,
    y: 0
}
let size = {
    width: 700,
    height: 700
}
let last_mouse_poz = {
    x: 0,
    y: 0
}
let mouse_poz = {
    x: 0,
    y: 0
}
let mouse_down = false;
let line_size = 1;
let no_objects = 0
let use = "pen"
let style = "stroke:#ff0000;stroke-width:1;stroke-linecap:round;fill:none"
let click_poz = {
    x: 0,
    y: 0
}
let color1 = {
    x: 0,
    y: 0
}
let color2 = {
    x: 0,
    y: 0
}
let selected_style
let selected_item = 0
let values = []
let item_type
let x
let y
let width
let height
let cx
let cy
let r
let rx
let ry
let selected_color
let new_line = true
let new_point = true
let no_points
let count_points
let selected_point
let undo = []
let redo = []
let extension = "png"
let backgroundColor = "white"
let colors = ["none", "none", "none"]
let R, G, B


//retin dimenisule svg-ului
function track_size() {
    let svg = document.getElementById("svg");
    let paper = svg.getBoundingClientRect();
    size.width = paper.width
    size.height = paper.height
    let sz = document.getElementById("size")
    sz.innerHTML = `SIZE: ${Math.round(size.width)}x${Math.round(size.height)}`
}

function track_mouse() {
    let svg = document.getElementById("svg");
    let paper = svg.getBoundingClientRect();
    svg.onmousemove = function (e) {
        mouse_poz.x = e.clientX - paper.x
        mouse_poz.y = e.clientY - paper.y
        if (mouse_down) {
            draw()
        }
        if (use === "move" || use === "edit_points")
            document.getElementById("svg").style.cursor = "move"
        else
            document.getElementById("svg").style.cursor = "default"

    }
    let location = document.getElementById("location");
    location.innerHTML = `LOCATION: ${Math.round(mouse_poz.x)}x${Math.round(mouse_poz.y)}`
}

function track_click() {
    let svg = document.getElementById("svg");
    svg.onmousedown = (e) => {
        if (e.button === 0)
            if (mouse_down === false) {
                if (use === "pen") {
                    mouse_down = true
                    path = "M" + mouse_poz.x + "," + mouse_poz.y + "Z ";
                    let h = svg.innerHTML
                    no_objects++
                    h += `<path d="${path}" style="${style}" id="${no_objects}"></path>`
                    svg.innerHTML = h

                }
                if (use === "square") {
                    mouse_down = true
                    rect = `x="${mouse_poz.x}" y="${mouse_poz.y}" width="0" height="0"`
                    let h = svg.innerHTML
                    no_objects++
                    h += `<rect ${rect} style="${style}" id="${no_objects}"></rect>`
                    svg.innerHTML = h
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y

                }
                if (use === "rounded_square") {
                    mouse_down = true
                    rect = `x="${mouse_poz.x}" y="${mouse_poz.y}" width="0" height="0" rx="20" ry="20"`
                    let h = svg.innerHTML
                    no_objects++
                    h += `<rect ${rect} style="${style}" id="${no_objects}"></rect>`
                    svg.innerHTML = h
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y
                }
                if (use === "circle") {
                    mouse_down = true
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y
                    circle = `cx="${mouse_poz.x}" cy="${mouse_poz.y}" r="0"`
                    let h = svg.innerHTML
                    no_objects++
                    h += `<circle ${circle} style="${style}" id="${no_objects}"></circle>`
                    svg.innerHTML = h
                }
                if (use === "triangle") {
                    mouse_down = true
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y
                    points = `${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y}`
                    let h = svg.innerHTML
                    no_objects++
                    h += `<polygon points="${points}" style="${style}" id="${no_objects}" title="triangle"></polygon>`
                    svg.innerHTML = h
                }
                if (use === "ellipse") {
                    mouse_down = true
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y
                    circle = `cx="${mouse_poz.x}" cy="${mouse_poz.y}" rx="0" ry="0"`
                    let h = svg.innerHTML
                    no_objects++
                    h += `<ellipse ${circle} style="${style}" id="${no_objects}"></ellipse>`
                    svg.innerHTML = h
                }
                if (use === "polygon") {
                    mouse_down = true
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y
                    points = `${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y} ${mouse_poz.x},${mouse_poz.y}`
                    let h = svg.innerHTML
                    no_objects++
                    h += `<polygon points="${points}" style="${style}" id="${no_objects}" title="hexagon"></polygon>`
                    svg.innerHTML = h
                }
                if (use === "line") {
                    mouse_down = true
                    if (new_line === true) {
                        new_line = false
                        new_point = true
                        path = "M" + mouse_poz.x + "," + mouse_poz.y + "Z ";
                        let h = svg.innerHTML
                        no_objects++
                        h += `<path d="${path}" style="${style}" id="${no_objects}" title="line"></path>`
                        svg.innerHTML = h
                    }
                }
                if (use === "curved_line") {
                    mouse_down = true
                    if (new_line === true) {
                        new_line = false
                        new_point = true
                        click_poz.x = mouse_poz.x
                        click_poz.y = mouse_poz.y
                        path = "M" + mouse_poz.x + "," + mouse_poz.y + "Z ";
                        let h = svg.innerHTML
                        no_objects++
                        h += `<path d="${path}" style="${style}" id="${no_objects}" title="curved_line"></path>`
                        svg.innerHTML = h

                    }
                }
                if (use === "move") {
                    click_poz.x = mouse_poz.x
                    click_poz.y = mouse_poz.y
                    mouse_down = true
                }
                if (use === "edit_points") {
                    mouse_down = true
                }
            }
    }
    svg.onmouseup = (e) => {
        if (e.button === 0) {
            new_point = true
            mouse_down = false
            if (use === "move") {
                if (selected_item !== 0) {

                    document.getElementById(selected_item).style.stroke = selected_style
                    values = []
                    selected_item = 0
                    item_type = "none"
                }
            }
            undo.push(document.getElementById("svg").innerHTML)
            if (use !== "edit_points" && use !== "select")
                actualizare_storage()
        }
    }
    svg.onmouseleave = () => {
        new_point = true
        if (use === "move") {
            if (selected_item !== 0) {
                document.getElementById(selected_item).style.stroke = selected_style
                values = []
                selected_item = 0
                item_type = "none"
            }
        }
        if (mouse_down) {
            undo.push(document.getElementById("svg").innerHTML)
            if (use !== "edit_points" && use !== "select")
                actualizare_storage()
        }
        mouse_down = false
    }

}


//apelez metoda de desenare in functie de unealta folosita
function draw() {
    if (use === "pen")
        draw_with_pen()
    if (use === "square")
        draw_square()
    if (use === "rounded_square")
        draw_rounded_square()
    if (use === "circle")
        draw_circle()
    if (use === "ellipse")
        draw_ellipse()
    if (use === "line")
        draw_line()
    if (use === "curved_line")
        draw_curved_line()
    if (use === "triangle")
        draw_triangle()
    if (use === "polygon")
        draw_polygon()
    if (use === "move")
        move_item()
    if (use === "edit_points")
        edit_point()
}

//desenare cu creionul
//la fiecare miscare se adauga un nou punct path-ului
function draw_with_pen() {
    let path = document.getElementById(no_objects).attributes.d.nodeValue;
    if (mouse_down) {
        path = path + "L" + mouse_poz.x + "," + mouse_poz.y + " ";
        document.getElementById(no_objects).attributes.d.nodeValue = path
    }
}

//desenare patrat,ma asigur ca coltul din stanga sus nu iese din canvasul svg
function draw_square() {

    let x = document.getElementById(no_objects).attributes.x.nodeValue
    let y = document.getElementById(no_objects).attributes.y.nodeValue
    let width = document.getElementById(no_objects).attributes.width.nodeValue
    let height = document.getElementById(no_objects).attributes.height.nodeValue
    if (mouse_down) {
        if (mouse_poz.x - x < 0) {
            width = click_poz.x - mouse_poz.x
            x = mouse_poz.x
        } else {
            width = mouse_poz.x - x
        }
        if (mouse_poz.y - y < 0) {
            height = click_poz.y - mouse_poz.y
            y = mouse_poz.y
        } else {
            height = mouse_poz.y - y
        }
        document.getElementById(no_objects).attributes.x.nodeValue = x
        document.getElementById(no_objects).attributes.y.nodeValue = y
        document.getElementById(no_objects).attributes.width.nodeValue = width
        document.getElementById(no_objects).attributes.height.nodeValue = height
    }
}

//similar cu metoda de desenare patrat,dar pentru
//patrat cu coluturi rotunjite
function draw_rounded_square() {

    let x = document.getElementById(no_objects).attributes.x.nodeValue
    let y = document.getElementById(no_objects).attributes.y.nodeValue
    let width = document.getElementById(no_objects).attributes.width.nodeValue
    let height = document.getElementById(no_objects).attributes.height.nodeValue
    if (mouse_down) {
        if (mouse_poz.x - x < 0) {
            width = click_poz.x - mouse_poz.x
            x = mouse_poz.x
        } else {
            width = mouse_poz.x - x
        }
        if (mouse_poz.y - y < 0) {
            height = click_poz.y - mouse_poz.y
            y = mouse_poz.y
        } else {
            height = mouse_poz.y - y
        }
        document.getElementById(no_objects).attributes.x.nodeValue = x
        document.getElementById(no_objects).attributes.y.nodeValue = y
        document.getElementById(no_objects).attributes.width.nodeValue = width
        document.getElementById(no_objects).attributes.height.nodeValue = height
    }
}

//desenare cerc
function draw_circle() {
    r = Math.sqrt(((mouse_poz.x - click_poz.x) ** 2) + ((mouse_poz.y - click_poz.y) ** 2))
    document.getElementById(no_objects).attributes.cx.nodeValue = mouse_poz.x
    document.getElementById(no_objects).attributes.cy.nodeValue = mouse_poz.y
    document.getElementById(no_objects).attributes.r.nodeValue = r
}

//desenare elipsa
function draw_ellipse() {
    document.getElementById(no_objects).attributes.cx.nodeValue = mouse_poz.x
    document.getElementById(no_objects).attributes.cy.nodeValue = mouse_poz.y
    document.getElementById(no_objects).attributes.rx.nodeValue = Math.abs(mouse_poz.x - click_poz.x)
    document.getElementById(no_objects).attributes.ry.nodeValue = Math.abs(mouse_poz.y - click_poz.y)
}

//desenare triunghi
function draw_triangle() {
    triangle = document.getElementById(no_objects).attributes.points.nodeValue
    points = triangle.split(/,|\s/g)
    points[2] = mouse_poz.x
    points[3] = mouse_poz.y
    points[4] = click_poz.x - mouse_poz.x + click_poz.x
    points[5] = mouse_poz.y
    document.getElementById(no_objects).attributes.points.nodeValue = `${points[0]},${points[1]} ${points[2]},${points[3]} ${points[4]},${points[5]}`
}

//desenare poligon
function draw_polygon() {
    triangle = document.getElementById(no_objects).attributes.points.nodeValue
    let l = mouse_poz.x - click_poz.x
    points = triangle.split(/,|\s/g)
    points[2] = mouse_poz.x
    points[3] = click_poz.y
    points[4] = mouse_poz.x + 1 / 2 * l
    points[5] = click_poz.y + (Math.sqrt(3) / 2) * l
    points[6] = mouse_poz.x
    points[7] = click_poz.y + Math.sqrt(3) * l
    points[8] = click_poz.x
    points[9] = click_poz.y + Math.sqrt(3) * l
    points[10] = click_poz.x - 1 / 2 * l
    points[11] = click_poz.y + (Math.sqrt(3) / 2) * l
    document.getElementById(no_objects).attributes.points.nodeValue = `${points[0]},${points[1]} ${points[2]},${points[3]} ${points[4]},${points[5]} ${points[6]},${points[7]} ${points[8]},${points[9]} ${points[10]},${points[11]}`
}

//desenare linii
function draw_line() {
    let path = document.getElementById(no_objects).attributes.d.nodeValue;
    if (mouse_down) {
        //daca adaug un nou punct
        if (new_point) {
            new_point = false
            path = path + "L" + mouse_poz.x + "," + mouse_poz.y + " ";
            document.getElementById(no_objects).attributes.d.nodeValue = path
        }
        //altfel modific pozitia ultimului punct
        else {
            let str = path.split(/M|Z|L|,|\s/g)
            let vector = []
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== "")
                    vector.push(str[i])
            }
            path = "M" + vector[0] + "," + vector[1] + "Z "
            for (let i = 2; i < vector.length - 2; i += 2)
                path += "L" + vector[i] + "," + vector[i + 1] + " "
            path += "L" + mouse_poz.x + "," + mouse_poz.y + " "
            document.getElementById(no_objects).attributes.d.nodeValue = path
        }
    }
}

//similar functiei de desenare linii,
//dar cu curbe bezier
function draw_curved_line() {
    let path = document.getElementById(no_objects).attributes.d.nodeValue;
    if (mouse_down) {
        if (new_point) {
            new_point = false
            path += `Q${click_poz.x+(mouse_poz.x-click_poz.x)/2},${click_poz.y+mouse_poz.y-click_poz.y} ${(click_poz.x+(mouse_poz.x-click_poz.x))},${mouse_poz.y}`
            document.getElementById(no_objects).attributes.d.nodeValue = path
        } else {
            let str = path.split(/M|Z|Q|,|\s/g)
            let vector = []
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== "")
                    vector.push(str[i])
            }
            path = "M" + vector[0] + "," + vector[1] + "Z "
            for (let i = 2; i < vector.length - 4; i += 4)
                path += "Q" + vector[i] + "," + vector[i + 1] + " " + vector[i + 2] + "," + vector[i + 3] + " "
            path += `Q${click_poz.x+(mouse_poz.x-click_poz.x)/2},${click_poz.y+mouse_poz.y-click_poz.y} ${(click_poz.x+(mouse_poz.x-click_poz.x))},${mouse_poz.y}`
            document.getElementById(no_objects).attributes.d.nodeValue = path
        }
    }
}

//setez listenerurile pentru selectia grosimii liniei
function setup_lines() {
    let l1 = document.getElementById("l1")
    let l2 = document.getElementById("l2")
    let l3 = document.getElementById("l3")
    let l4 = document.getElementById("l4")
    l1.onclick = () => {
        l1.className = "inside_selected"
        l2.className = "inside"
        l3.className = "inside"
        l4.className = "inside"
        line_size = 1;
        set_line_size()
    }
    l2.onclick = () => {
        l2.className = "inside_selected"
        l1.className = "inside"
        l3.className = "inside"
        l4.className = "inside"
        line_size = 3;
        set_line_size()
    }
    l3.onclick = () => {
        l3.className = "inside_selected"
        l1.className = "inside"
        l2.className = "inside"
        l4.className = "inside"
        line_size = 6;
        set_line_size()
    }
    l4.onclick = () => {
        l4.className = "inside_selected"
        l1.className = "inside"
        l3.className = "inside"
        l2.className = "inside"
        line_size = 10;
        set_line_size()
    }
}

//setez grosimea liniei
function set_line_size() {
    let properties = style.split(";")
    properties[1] = "stroke-width:" + line_size
    style = properties[0] + ";" + properties[1] + ";" + properties[2] + ";" + properties[3]
}

//setez listenerurile pentru culori
function setup_colors() {
    for (let i = 1; i <= 12; i++) {
        document.getElementById("color" + i).onclick = (e) => {
            if (e.button == 0) {
                set_color(i)
                for (let j = 1; j <= 12; j++) {
                    if (j === i) {
                        document.getElementById("color" + j).className = "color_selected"
                    } else
                        document.getElementById("color" + j).className = "color"
                }
            }
        }

    }
}

//setez noua culoare de desenare
function set_color(i) {
    let div = document.getElementById("color" + i);
    let color = div.style.backgroundColor;
    let properties = style.split(";")
    selected_color = color
    properties[0] = "stroke:" + color
    style = properties[0] + ";" + properties[1] + ";" + properties[2] + ";" + properties[3]
    if (use === "select") {
        let item = document.getElementById(selected_item)
        item.style.stroke = color
        selected_style = item.style.stroke
    }
}

//setez listeneruri pe butoanele de unelte
function setup_shapes() {
    let v = []
    v.push(document.getElementById("pen"))
    v.push(document.getElementById("delete"))
    v.push(document.getElementById("circle"))
    v.push(document.getElementById("ellipse"))
    v.push(document.getElementById("square"))
    v.push(document.getElementById("rounded_square"))
    v.push(document.getElementById("line"))
    v.push(document.getElementById("triangle"))
    v.push(document.getElementById("polygon"))
    v.push(document.getElementById("curved_line"))
    for (let i = 0; i < v.length; i++) {
        v[i].onclick = (e) => {

            if (e.button == 0) {
                delete_circles()
                v[i].className = "shape_selected"
                document.getElementById("move").className = "shape"
                document.getElementById("edit_points").className = "shape"
                document.getElementById("select").className = "inside"
                if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined) {
                    document.getElementById(selected_item).style.stroke = selected_style
                }
                use = v[i].id
                for (let j = 0; j < v.length; j++) {
                    if (i !== j) {
                        v[j].className = "shape"
                    }
                }
                if (use === "line" || use === "curved_line")
                    new_line = true

            }
        }
    }

    document.getElementById("move").onclick = (e) => {
        if (e.button == 0) {
            delete_circles()
            document.getElementById("move").className = "shape_selected"
            document.getElementById("select").className = "inside"
            document.getElementById("edit_points").className = "shape"
            use = "move"
            if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined) {
                document.getElementById(selected_item).style.stroke = selected_style
            }
            for (let i = 0; i < v.length; i++)
                v[i].className = "shape"

            for (var i = 0; i <= no_objects; i++) {
                if (document.getElementById(i) !== null && document.getElementById(i) !== undefined)
                    document.getElementById(i).onmousedown = function (e) {
                        if (use === "move") {
                            if (e.button == 0) {
                                selected_item = e.path[0].id
                                let item = document.getElementById(selected_item)
                                selected_style = item.style.stroke
                                item.style.stroke = "#007bff"
                                if (item.attributes.d !== undefined && item.attributes.d !== null) {
                                    if (item.attributes.title === null || item.attributes.title === undefined) {
                                        item_type = "path"
                                        string = item.attributes.d.nodeValue
                                        str = string.split(',')
                                        for (let i = 0; i < str.length; i++) {
                                            let v = str[i].split(/M|ZL|L/g)
                                            for (let j = 0; j < v.length; j++)
                                                values.push(v[j])
                                        }
                                        values.shift()
                                    } else if (item.attributes.title !== null || item.attributes.title !== undefined) {
                                        if (item.attributes.title.nodeValue === "line") {

                                            item_type = "path"
                                            string = item.attributes.d.nodeValue
                                            str = string.split(',')
                                            for (let i = 0; i < str.length; i++) {
                                                let v = str[i].split(/M|ZL|L/g)
                                                for (let j = 0; j < v.length; j++)
                                                    values.push(v[j])
                                            }
                                            values.shift()
                                        }
                                        if (item.attributes.title.nodeValue === "curved_line") {
                                            item_type = "path"
                                            string = item.attributes.d.nodeValue
                                            str = string.split(/M|Z|Q|\s|,/g)
                                            for (let i = 0; i < str.length; i++) {
                                                if (str[i] !== "")
                                                    values.push(str[i])
                                            }
                                        }


                                    }

                                }
                                if (item.attributes.x !== undefined && item.attributes.x !== null) {
                                    item_type = "rect"
                                    x = item.attributes.x.nodeValue
                                    y = item.attributes.y.nodeValue
                                    width = item.attributes.width.nodeValue
                                    height = item.attributes.height.nodeValue

                                }
                                if (item.attributes.cx !== undefined && item.attributes.cx !== null) {
                                    item_type = "circle"
                                    cx = item.attributes.cx.nodeValue
                                    cy = item.attributes.cy.nodeValue
                                }
                                if (item.attributes.points !== undefined && item.attributes.points !== null) {
                                    if (item.attributes.title.nodeValue === "triangle")
                                        item_type = "triangle"
                                    else
                                        item_type = "hexagon"
                                    triangle = item.attributes.points.nodeValue
                                    points = triangle.split(/,|\s/g)
                                    for (let i = 0; i < points.length; i++)
                                        values.push(points[i])
                                }
                            }
                        }

                    }
            }
            document.getElementById("svg").style.cursor = "move"
        }
    }

    document.getElementById("select").onclick = (e) => {
        if (e.button === 0) {
            delete_circles()
            document.getElementById("select").className = "inside_selected"
            document.getElementById("edit_points").className = "shape"
            document.getElementById("move").className = "shape"
            use = "select"
            if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined) {
                document.getElementById(selected_item).style.stroke = selected_style
            }
            for (let i = 0; i < v.length; i++) {
                v[i].className = "shape"
            }

            for (var i = 0; i <= no_objects; i++) {
                if (document.getElementById(i) !== null && document.getElementById(i) !== undefined)
                    document.getElementById(i).onclick = function (e) {
                        if (use === "select") {
                            if (e.button == 0) {
                                if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined) {
                                    document.getElementById(selected_item).style.stroke = selected_style
                                }
                                selected_item = e.path[0].id
                                let item = document.getElementById(selected_item)
                                selected_style = item.style.stroke
                                item.style.stroke = "#007bff"
                            }
                        }

                    }
            }
        }


    }

    document.getElementById("edit_points").onclick = (e) => {
        if (e.button === 0) {
            delete_circles()
            document.getElementById("edit_points").className = "shape_selected"
            document.getElementById("select").className = "inside"
            document.getElementById("move").className = "shape"
            for (let i = 0; i < v.length; i++) {
                v[i].className = "shape"
            }
            use = "edit_points"
            if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined) {
                document.getElementById(selected_item).style.stroke = selected_style
            }

            for (let i = 0; i <= no_objects; i++) {

                if (use === "edit_points")
                    if (document.getElementById(i) !== null && document.getElementById(i) !== undefined)
                        if (document.getElementById(i).attributes.title !== null && document.getElementById(i).attributes.title !== undefined) {
                            if (document.getElementById(i).attributes.title.nodeValue === "line") {
                                document.getElementById(i).onclick = (e) => {
                                    if (e.button === 0) {
                                        selected_item = i
                                        let item = document.getElementById(selected_item)
                                        selected_style = item.style.stroke
                                        item.style.stroke = "#007bff"
                                        let path = document.getElementById(i).attributes.d.nodeValue
                                        let str = path.split(/M|Z|L|,|\s/g)
                                        let vector = []
                                        for (let i = 0; i < str.length; i++) {
                                            if (str[i] !== "")
                                                vector.push(str[i])
                                        }
                                        no_points = vector.length / 2
                                        for (let j = 0; j < vector.length; j += 2) {
                                            let svg = document.getElementById("svg");
                                            circle = `cx="${parseInt(vector[j])}" cy="${parseInt(vector[j+1])}" r="5"`
                                            let h = svg.innerHTML
                                            h += `<circle ${circle} style="${"stroke:#ff0000;stroke-width:5;stroke-linecap:round;fill:gray"}" id="c${j/2}"></circle>`
                                            svg.innerHTML = h
                                        }
                                        for (let j = 0; j < no_points; j++) {
                                            document.getElementById("c" + j).onmousedown = (e) => {
                                                selected_point = j
                                            }
                                        }
                                    }

                                }

                            }
                            if (document.getElementById(i).attributes.title.nodeValue === "curved_line") {
                                document.getElementById(i).onclick = (e) => {
                                    if (e.button === 0) {
                                        selected_item = i
                                        let item = document.getElementById(selected_item)
                                        selected_style = item.style.stroke
                                        item.style.stroke = "#007bff"
                                        let path = document.getElementById(i).attributes.d.nodeValue
                                        let str = path.split(/M|Z|Q|,|\s/g)
                                        let vector = []
                                        for (let i = 0; i < str.length; i++) {
                                            if (str[i] !== "")
                                                vector.push(str[i])
                                        }
                                        no_points = vector.length / 2
                                        for (let j = 0; j < vector.length; j += 2) {
                                            let svg = document.getElementById("svg");
                                            circle = `cx="${parseInt(vector[j])}" cy="${parseInt(vector[j+1])}" r="5"`
                                            let h = svg.innerHTML
                                            h += `<circle ${circle} style="${"stroke:#ff0000;stroke-width:5;stroke-linecap:round;fill:gray"}" id="c${j/2}"></circle>`
                                            svg.innerHTML = h
                                        }
                                        for (let j = 0; j < no_points; j++) {
                                            document.getElementById("c" + j).onmousedown = (e) => {
                                                selected_point = j
                                            }
                                        }
                                    }

                                }

                            }
                        }
            }
        }
    }
}

//functie pentru stergerea unui element
function setup_delete() {
    document.getElementById("delete").onclick = (e) => {
        if (e.button === 0 && use === "select") {
            if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined)
                document.getElementById("svg").removeChild(document.getElementById(selected_item));
            actualizare_storage()
        }
    }
}

//functie pentru umplerea unui element
function setup_fill() {
    document.getElementById("fill").onclick = (e) => {
        if (e.button === 0 && use === "select") {
            if (document.getElementById(selected_item) !== null && document.getElementById(selected_item) !== undefined) {
                let props = document.getElementById(selected_item).attributes.style.nodeValue.split(";")
                props[3] = "fill:" + selected_color + ";";
                let string = props[0] + ";" + props[1] + ";" + props[2] + ";" + props[3] + ";"
                document.getElementById(selected_item).attributes.style.nodeValue = string
            }
            actualizare_storage()
        }
    }
}

//mutarea unei cai
//procedez diferit in functie de tipul pathului selectat
function move_path() {

    ok = true
    correct_values = []
    for (let i = 0; i < values.length; i += 2) {
        correct_values.push(mouse_poz.x - click_poz.x + parseInt(values[i]))
        correct_values.push(mouse_poz.y - click_poz.y + parseInt(values[i + 1]))

    }
    for (let i = 0; i < correct_values.length; i++) {
        if (correct_values[i] < 0)
            ok = false

    }
    if (ok === true) {
        let item = document.getElementById(selected_item)
        if (correct_values.length < 3)
            string = "M" + correct_values[0] + "," + correct_values[1] + "Z"
        else {

            if (item.attributes.title !== undefined && item.attributes.title !== null)
                if (item.attributes.title.nodeValue !== "curved_line") {
                    string = "M" + correct_values[0] + "," + correct_values[1] + "ZL" + correct_values[2] + "," + correct_values[3]
                    for (let i = 4; i < correct_values.length; i += 2) {
                        string += "L" + correct_values[i] + "," + correct_values[i + 1]
                    }
                }
            else {
                string = "M" + correct_values[0] + "," + correct_values[1] + "Z "
                for (let i = 2; i < correct_values.length; i += 4) {
                    string += "Q" + correct_values[i] + "," + correct_values[i + 1] + " " + correct_values[i + 2] + "," + correct_values[i + 3] + " "
                }
            } else {
                string = "M" + correct_values[0] + "," + correct_values[1] + "ZL" + correct_values[2] + "," + correct_values[3]
                for (let i = 4; i < correct_values.length; i += 2) {
                    string += "L" + correct_values[i] + "," + correct_values[i + 1]
                }
            }

        }

        item.attributes.d.nodeValue = string
    }
}

//mutare patrat
function move_rect() {
    let item = document.getElementById(selected_item)
    if (mouse_poz.x - click_poz.x + parseInt(x) > 0 && mouse_poz.y - click_poz.y + parseInt(y)) {
        item.attributes.x.nodeValue = mouse_poz.x - click_poz.x + parseInt(x)
        item.attributes.y.nodeValue = mouse_poz.y - click_poz.y + parseInt(y)
    }

}

//mutare ccerc
function move_circle() {
    let item = document.getElementById(selected_item)
    item.attributes.cx.nodeValue = mouse_poz.x - click_poz.x + parseInt(cx)
    item.attributes.cy.nodeValue = mouse_poz.y - click_poz.y + parseInt(cy)
}

//mutare triunghi
function move_triangle() {
    triangle = document.getElementById(selected_item).attributes.points.nodeValue
    points = triangle.split(/,|\s/g)
    for (let i = 0; i < points.length; i += 2) {
        points[i] = mouse_poz.x - click_poz.x + parseInt(values[i])
        points[i + 1] = mouse_poz.y - click_poz.y + parseInt(values[i + 1])
    }
    if (item_type === "triangle")
        document.getElementById(selected_item).attributes.points.nodeValue = `${points[0]},${points[1]} ${points[2]},${points[3]} ${points[4]},${points[5]}`
    else
        document.getElementById(selected_item).attributes.points.nodeValue = `${points[0]},${points[1]} ${points[2]},${points[3]} ${points[4]},${points[5]} ${points[6]},${points[7]} ${points[8]},${points[9]} ${points[10]},${points[11]}`
}

function move_item() {
    if (item_type === "path")
        move_path()
    if (item_type === "rect")
        move_rect()
    if (item_type === "circle")
        move_circle()
    if (item_type === "triangle" || item_type === "hexagon")
        move_triangle()

}


//functie pentru mutarea unui punct al unui path
function edit_point() {
    if (selected_point !== null && selected_point !== undefined) {
        if (document.getElementById(selected_item).attributes.title.nodeValue === "line") {
            document.getElementById("c" + selected_point).attributes.cx.nodeValue = mouse_poz.x
            document.getElementById("c" + selected_point).attributes.cy.nodeValue = mouse_poz.y
            let path = document.getElementById(selected_item).attributes.d.nodeValue;
            let str = path.split(/M|Z|L|,|\s/g)
            let vector = []
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== "")
                    vector.push(str[i])
            }
            vector[2 * selected_point] = mouse_poz.x
            vector[2 * selected_point + 1] = mouse_poz.y
            path = "M" + vector[0] + "," + vector[1] + "Z "
            for (let i = 2; i < vector.length; i += 2)
                path += "L" + vector[i] + "," + vector[i + 1] + " "
            document.getElementById(selected_item).attributes.d.nodeValue = path
        }
        if (document.getElementById(selected_item).attributes.title.nodeValue === "curved_line") {
            document.getElementById("c" + selected_point).attributes.cx.nodeValue = mouse_poz.x
            document.getElementById("c" + selected_point).attributes.cy.nodeValue = mouse_poz.y
            let path = document.getElementById(selected_item).attributes.d.nodeValue;
            let str = path.split(/M|Z|Q|,|\s/g)
            let vector = []
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== "")
                    vector.push(str[i])
            }
            vector[2 * selected_point] = mouse_poz.x
            vector[2 * selected_point + 1] = mouse_poz.y
            path = "M" + vector[0] + "," + vector[1] + "Z "
            for (let i = 2; i < vector.length; i += 4)
                path += "Q" + vector[i] + "," + vector[i + 1] + " " + vector[i + 2] + "," + vector[i + 3]
            document.getElementById(selected_item).attributes.d.nodeValue = path
        }
    }

}


//sterg punctele de inflexiune de pe path
function delete_circles() {
    selected_point = null
    for (let i = 0; i < no_points; i++)
        if (document.getElementById("c" + i) !== null && document.getElementById("c" + i) !== undefined)
            document.getElementById("svg").removeChild(document.getElementById("c" + i));

}


//colorare background
function setup_background() {
    document.getElementById("background").onclick = (e) => {
        if (e.button === 0) {
            document.getElementById("svg").style.backgroundColor = selected_color
            backgroundColor = selected_color
            actualizare_storage()
        }
    }
}

//eliminare element din vectorul undo si adaugare in redo + setare svg.innerHTML
function setup_undo() {

    svg = document.getElementById("svg")
    undo.push(svg.innerHTML)
    document.getElementById("undo").onclick = (e) => {
        if (e.button === 0) {
            if (undo.length > 1) {
                svg.innerHTML = undo[undo.length - 2]
                redo.push(undo.pop())
                actualizare_storage()
            }
        }
    }
}

//eliminare element din vectorul redo+ setare svg.innerHTML
function setup_redo() {
    document.getElementById("redo").onclick = (e) => {
        if (e.button === 0) {
            if (redo.length > 0) {
                svg.innerHTML = redo[redo.length - 1]
                undo.push(redo.pop())
            }
        }
        actualizare_storage()
    }
}

//actualizez storageul
function actualizare_storage() {
    delete_circles()
    localStorage.setItem('svg', document.getElementById("svg").innerHTML)
    localStorage.setItem('no_objects', no_objects)
    localStorage.setItem('width', size.width)
    localStorage.setItem('height', size.height)
    localStorage.setItem('background', backgroundColor)
}

//salvare desen
function setup_save() {
    document.getElementById("download").onclick = () => {
        var svgElement = document.getElementById('svg');
        width_s = document.querySelector("svg").style.width
        width = width_s.split('p')[0]
        height_s = document.querySelector("svg").style.height
        height = height_s.split('p')[0]
        let clonedSvgElement = svgElement.cloneNode(true)
        let outerHTML = clonedSvgElement.outerHTML
        const blob = new Blob([outerHTML], {
            type: 'image/svg+xml'
        });
        let URL = window.URL || window.webkitURL || window;
        let blobURL = URL.createObjectURL(blob);
        let image = new Image();
        image.src = blobURL;
        image.onload = () => {

            let canvas = document.createElement('canvas');

            canvas.width = width;
            canvas.height = height;
            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, width, height);
            var download = function (href, name) {
                var link = document.createElement('a');
                link.download = name;
                link.style.opacity = "0";
                body.append(link);
                link.href = href;
                link.click();
                link.remove();
            }
            let png = canvas.toDataURL(`image/${extension}`);
            let name
            if (document.getElementById("i_file").value != "")
                name = document.getElementById("i_file").value
            else
                name = "image"
            if (extension === "jpeg" || extension === "png") {
                download(png, name);
            } else
                download(blobURL, name);
        }
    }
    document.getElementById("save").onclick = () => {
        document.querySelector(".background_modal").style.display = 'flex'
    }
    document.querySelector(".close").onclick = () => {
        document.querySelector(".background_modal").style.display = 'none'
    }
    document.getElementById("png").onclick = () => {
        document.getElementById("png").className = "radio_selected"
        document.getElementById("jpeg").className = "radio"
        document.getElementById("svg_ext").className = "radio"
        extension = "png"
    }
    document.getElementById("jpeg").onclick = () => {
        document.getElementById("jpeg").className = "radio_selected"
        document.getElementById("png").className = "radio"
        document.getElementById("svg_ext").className = "radio"
        extension = "jpeg"
    }
    document.getElementById("svg_ext").onclick = () => {
        document.getElementById("svg_ext").className = "radio_selected"
        document.getElementById("jpeg").className = "radio"
        document.getElementById("png").className = "radio"
        extension = "svg"
    }

}

function setup_resize() {
    document.getElementById("resize").onclick = () => {
        document.querySelector(".background_modal1").style.display = 'flex'
    }
    document.querySelector(".close1").onclick = () => {
        document.querySelector(".background_modal1").style.display = 'none'
    }
    document.getElementById("res").onclick = () => {
        w = document.getElementById("i_width").value
        h = document.getElementById("i_height").value
        w = parseInt(w)
        h = parseInt(h)
        if (!isNaN(w) && !isNaN(h)) {
            size.width = w
            size.height = h
            document.querySelector("svg").style.width = size.width
            document.querySelector("svg").style.height = size.height
        }
        actualizare_storage()
    }
}

function setup_new_file() {
    document.getElementById("new").onclick = () => {
        document.getElementById("svg").innerHTML = `<path d=" " style="stroke:#ff0000;stroke-width:1;stroke-linecap:round;fill:none" id=0>`
        no_objects = 0
        actualizare_storage()
        document.getElementById("svg").style.backgroundColor = ""

    }
}

function setup_front_back() {
    document.getElementById("to_front").onclick = () => {
        document.getElementById(selected_item).style.stroke = selected_style
        let item = document.getElementById(selected_item).outerHTML
        document.getElementById("svg").removeChild(document.getElementById(selected_item))
        document.getElementById("svg").innerHTML += item
        actualizare_storage()
    }
    document.getElementById("to_back").onclick = () => {
        document.getElementById(selected_item).style.stroke = selected_style
        let item = document.getElementById(selected_item).outerHTML
        document.getElementById("svg").removeChild(document.getElementById(selected_item))
        inner = document.getElementById("svg").innerHTML
        document.getElementById("svg").innerHTML = item
        document.getElementById("svg").innerHTML += inner
        actualizare_storage()
    }
}


//creare color picker
function setup_colorpicker() {
    document.getElementById("choose_color").onclick = () => {
        document.querySelector(".background_modal2").style.display = "flex"
        let canvas = document.getElementById("canvas")
        canvas.width = screen.width / 4 + screen.width / 16;
        canvas.height = 20;
        let context = canvas.getContext('2d');
        let imgData = context.getImageData(0, 0, screen.width / 4 + screen.width / 16, 20)
        let raport = Math.floor(1530 / canvas.width)
        let red = 255
        let green = 0
        let blue = 0
        for (let i = 0; i < canvas.width * 4; i += 4) {
            for (let j = 0; j < 20; j++)
                if (green <= 255 && red === 255 && blue === 0) {
                    imgData.data[j * canvas.width * 4 + i] = 255
                    imgData.data[j * canvas.width * 4 + i + 1] = green
                    imgData.data[j * canvas.width * 4 + i + 3] = 255
                }
            else if (green === 255 && red >= 0 && blue === 0) {
                imgData.data[j * canvas.width * 4 + i] = red
                imgData.data[j * canvas.width * 4 + i + 1] = 255
                imgData.data[j * canvas.width * 4 + i + 3] = 255
            } else if (green === 255 && red <= 0 && blue <= 255) {
                imgData.data[j * canvas.width * 4 + i] = red
                imgData.data[j * canvas.width * 4 + i + 1] = 255
                imgData.data[j * canvas.width * 4 + i + 3] = 255
                imgData.data[j * canvas.width * 4 + i + 2] = blue
            } else if (green >= 0 && red <= 0 && blue === 255) {
                imgData.data[j * canvas.width * 4 + i] = red
                imgData.data[j * canvas.width * 4 + i + 1] = green
                imgData.data[j * canvas.width * 4 + i + 3] = 255
                imgData.data[j * canvas.width * 4 + i + 2] = 255
            } else if (green === 0 && red <= 255 && blue === 255) {
                imgData.data[j * canvas.width * 4 + i] = red
                imgData.data[j * canvas.width * 4 + i + 1] = green
                imgData.data[j * canvas.width * 4 + i + 3] = 255
                imgData.data[j * canvas.width * 4 + i + 2] = 255
            } else if (green === 0 && red === 255 && blue < 255) {
                imgData.data[j * canvas.width * 4 + i] = 255
                imgData.data[j * canvas.width * 4 + i + 1] = green
                imgData.data[j * canvas.width * 4 + i + 3] = 255
                imgData.data[j * canvas.width * 4 + i + 2] = blue
            }
            if (green < 255 && red === 255 && blue === 0) {
                green += raport
                if (green > 255)
                    green = 255
            }
            if (green === 255 && red > 0 && blue === 0) {
                red -= raport
                if (red < 0)
                    red = 0
            }
            if (green === 255 && red <= 0 && blue < 255) {
                blue += raport
                if (blue > 255)
                    blue = 255
            }
            if (green >= 0 && red <= 0 && blue === 255) {
                green -= raport
                if (green < 0)
                    green = 0
            }
            if (green === 0 && red < 255 && blue === 255) {
                red += raport
                if (red > 255)
                    red = 255
            }
            if (green === 0 && red === 255 && blue > 0) {
                blue -= raport
                if (blue < 0)
                    blue = 0
            }

        }
        context.putImageData(imgData, 0, 0)
        let paper1 = canvas.getBoundingClientRect();
        canvas.onmousedown = function (e) {
            color1.x = Math.round(e.clientX - paper1.x)
            color1.y = Math.round(e.clientY - paper1.x)
            let canvas1 = document.getElementById("canvas1")
            canvas1.width = screen.width / 4;
            canvas1.height = screen.height / 4;
            let context1 = canvas1.getContext('2d');
            let imgData1 = context1.getImageData(0, 0, screen.width / 4, screen.height / 4)
            for (let i = 0; i < canvas1.width; i++) {
                imgData1.data[i * 4] = 255 - (255 - imgData.data[color1.x * 4]) * i / canvas1.width
                imgData1.data[i * 4 + 1] = 255 - (255 - imgData.data[color1.x * 4 + 1]) * i / canvas1.width
                imgData1.data[i * 4 + 2] = 255 - (255 - imgData.data[color1.x * 4 + 2]) * i / canvas1.width
                imgData1.data[i * 4 + 3] = 255
                for (let j = 1; j < canvas1.height; j++) {
                    imgData1.data[j * canvas1.width * 4 + i * 4] = imgData1.data[i * 4] - imgData1.data[i * 4] * j / canvas1.height
                    imgData1.data[j * canvas1.width * 4 + i * 4 + 1] = imgData1.data[i * 4 + 1] - imgData1.data[i * 4 + 1] * j / canvas1.height
                    imgData1.data[j * canvas1.width * 4 + i * 4 + 2] = imgData1.data[i * 4 + 2] - imgData1.data[i * 4 + 2] * j / canvas1.height
                    imgData1.data[j * canvas1.width * 4 + i * 4 + 3] = 255
                }
            }
            context1.putImageData(imgData1, 0, 0)
            let paper2 = canvas1.getBoundingClientRect();
            canvas1.onmousedown = function (e) {
                color2.x = Math.round(e.clientX - paper2.x)
                color2.y = Math.round(e.clientY - paper2.y)
                let canvas2 = document.getElementById("canvas2")
                canvas2.width = screen.width / 16;
                canvas2.height = screen.height / 4;
                let context2 = canvas2.getContext('2d');
                let imgData2 = context2.getImageData(0, 0, screen.width / 16, screen.height / 4)
                for (let i = 0; i < imgData2.data.length; i += 4) {
                    imgData2.data[i] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4]
                    imgData2.data[i + 1] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4 + 1]
                    imgData2.data[i + 2] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4 + 2]
                    imgData2.data[i + 3] = 255
                    R = imgData2.data[i]
                    G = imgData2.data[i + 1]
                    B = imgData2.data[i + 2]
                }
                context2.putImageData(imgData2, 0, 0)
                document.getElementById("choose").onclick = () => {

                    let color = `rgb(${R},${G},${B})`
                    for (let i = 0; i < colors.length; i++) {
                        if (colors[i] === "none") {
                            document.getElementById(`color1${i}`).style.backgroundColor = color
                            colors[i] = "something"
                            break;
                        }
                        if (colors[i] === "something" && i === 2) {
                            document.getElementById("color10").style.backgroundColor = color
                            colors[1] = "none"
                            colors[2] = "none"
                        }

                    }
                    document.querySelector(".background_modal2").style.display = "none"
                }
            }
            let canvas2 = document.getElementById("canvas2")
            canvas2.width = screen.width / 16;
            canvas2.height = screen.height / 4;
            let context2 = canvas2.getContext('2d');
            let imgData2 = context2.getImageData(0, 0, screen.width / 16, screen.height / 4)
            for (let i = 0; i < imgData2.data.length; i += 4) {
                imgData2.data[i] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4]
                imgData2.data[i + 1] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4 + 1]
                imgData2.data[i + 2] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4 + 2]
                imgData2.data[i + 3] = 255
                R = imgData2.data[i]
                G = imgData2.data[i + 1]
                B = imgData2.data[i + 2]
            }
            context2.putImageData(imgData2, 0, 0)
            document.getElementById("choose").onclick = () => {

                let color = `rgb(${R},${G},${B})`
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i] === "none") {
                        document.getElementById(`color1${i}`).style.backgroundColor = color
                        colors[i] = "something"
                        break;
                    }
                    if (colors[i] === "something" && i === 2) {
                        document.getElementById("color10").style.backgroundColor = color
                        colors[1] = "none"
                        colors[2] = "none"
                    }

                }
                document.querySelector(".background_modal2").style.display = "none"
            }

        }

        let canvas1 = document.getElementById("canvas1")
        canvas1.width = screen.width / 4;
        canvas1.height = screen.height / 4;
        let context1 = canvas1.getContext('2d');
        let imgData1 = context1.getImageData(0, 0, screen.width / 4, screen.height / 4)
        for (let i = 0; i < canvas1.width; i++) {
            imgData1.data[i * 4] = 255 - (255 - imgData.data[color1.x * 4]) * i / canvas1.width
            imgData1.data[i * 4 + 1] = 255 - (255 - imgData.data[color1.x * 4 + 1]) * i / canvas1.width
            imgData1.data[i * 4 + 2] = 255 - (255 - imgData.data[color1.x * 4 + 2]) * i / canvas1.width
            imgData1.data[i * 4 + 3] = 255
            for (let j = 1; j < canvas1.height; j++) {
                imgData1.data[j * canvas1.width * 4 + i * 4] = imgData1.data[i * 4] - imgData1.data[i * 4] * j / canvas1.height
                imgData1.data[j * canvas1.width * 4 + i * 4 + 1] = imgData1.data[i * 4 + 1] - imgData1.data[i * 4 + 1] * j / canvas1.height
                imgData1.data[j * canvas1.width * 4 + i * 4 + 2] = imgData1.data[i * 4 + 2] - imgData1.data[i * 4 + 2] * j / canvas1.height
                imgData1.data[j * canvas1.width * 4 + i * 4 + 3] = 255
            }
        }
        context1.putImageData(imgData1, 0, 0)
        let paper2 = canvas1.getBoundingClientRect();
        canvas1.onmousedown = function (e) {
            color2.x = Math.round(e.clientX - paper2.x)
            color2.y = Math.round(e.clientY - paper2.y)
            let canvas2 = document.getElementById("canvas2")
            canvas2.width = screen.width / 16;
            canvas2.height = screen.height / 4;
            let context2 = canvas2.getContext('2d');
            let imgData2 = context2.getImageData(0, 0, screen.width / 16, screen.height / 4)
            for (let i = 0; i < imgData2.data.length; i += 4) {
                imgData2.data[i] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4]
                imgData2.data[i + 1] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4 + 1]
                imgData2.data[i + 2] = imgData1.data[color2.x * 4 + canvas1.width * (color2.y) * 4 + 2]
                imgData2.data[i + 3] = 255
                R = imgData2.data[i]
                G = imgData2.data[i + 1]
                B = imgData2.data[i + 2]
            }
            context2.putImageData(imgData2, 0, 0)
            document.getElementById("choose").onclick = () => {

                let color = `rgb(${R},${G},${B})`
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i] === "none") {
                        document.getElementById(`color1${i}`).style.backgroundColor = color
                        colors[i] = "something"
                        break;
                    }
                    if (colors[i] === "something" && i === 2) {
                        document.getElementById("color10").style.backgroundColor = color
                        colors[1] = "none"
                        colors[2] = "none"
                    }

                }
                document.querySelector(".background_modal2").style.display = "none"
            }
        }
        let canvas2 = document.getElementById("canvas2")
        canvas2.width = screen.width / 16;
        canvas2.height = screen.height / 4;
        let context2 = canvas2.getContext('2d');
        let imgData2 = context2.getImageData(0, 0, screen.width / 16, screen.height / 4)
        for (let i = 0; i < imgData2.data.length; i += 4) {
            imgData2.data[i] = imgData1.data[color2.x]
            imgData2.data[i + 1] = imgData1.data[color2.x + 1]
            imgData2.data[i + 2] = imgData1.data[color2.x + 2]
            imgData2.data[i + 3] = 255
            R = imgData2.data[i]
            G = imgData2.data[i + 1]
            B = imgData2.data[i + 2]
        }
        context2.putImageData(imgData2, 0, 0)



        document.querySelector(".close2").onclick = () => {
            document.querySelector(".background_modal2").style.display = "none"
        }

        document.getElementById("choose").onclick = () => {

            let color = `rgb(${R},${G},${B})`
            for (let i = 0; i < colors.length; i++) {
                if (colors[i] === "none") {
                    document.getElementById(`color1${i}`).style.backgroundColor = color
                    colors[i] = "something"
                    break;
                }
                if (colors[i] === "something" && i === 2) {
                    document.getElementById("color10").style.backgroundColor = color
                    colors[1] = "none"
                    colors[2] = "none"
                }

            }
            document.querySelector(".background_modal2").style.display = "none"
        }

    }
}
window.onload = () => {
    if (localStorage.getItem('svg') !== null && localStorage.getItem('svg') !== undefined) {
        document.getElementById("svg").innerHTML = localStorage.getItem('svg')
        if (localStorage.getItem('no_objects') !== null && localStorage.getItem('no_objects') !== undefined)
            no_objects = localStorage.getItem('no_objects')
        else
            no_objects = 0
    }
    if (localStorage.getItem('width') !== null && localStorage.getItem('width') !== undefined)
        size.width = localStorage.getItem('width')
    if (localStorage.getItem('height') !== null && localStorage.getItem('height') !== undefined)
        size.height = localStorage.getItem('height')
    document.querySelector("svg").style.width = size.width
    document.querySelector("svg").style.height = size.height
    if (localStorage.getItem('background') !== null && localStorage.getItem('background') !== undefined) {
        backgroundColor = localStorage.getItem('background')
        document.getElementById("svg").style.backgroundColor = backgroundColor
    }
    new_line = true
    new_point = true
    mouse_down = false
    use = "pen"
    window.setInterval(track_mouse, 20);
    window.setInterval(track_size, 20);
    track_click()
    setup_lines()
    setup_colors()
    setup_shapes()
    setup_delete()
    setup_fill()
    setup_background()
    setup_undo()
    setup_redo()
    setup_save()
    setup_resize()
    setup_new_file()
    setup_front_back()
    setup_colorpicker()
}