get_map = function() {
    let table = Array.from(document.getElementsByTagName("table"))
        //.filter(x => x.tHead != null && x.tHead.rows[0].cells[0].innerText.trim() === "Achievement")

    let arr = Array.from(table[0].tBodies[0].rows)

    let map = new Map()

    arr.forEach(x => {
        var u = x.cells[0].firstElementChild
       
        if (u == null) {
            return
        }

        let txt = u.lastElementChild.firstElementChild.innerText.trim()

        if (txt === "Aggressive Expander") {
            txt = "Agressive Expander"
        }

        map.set(txt, x)
    })

    return map
}

var map = get_map()

del_by_name = function(map, name) {
    let elem = map.get(name)

    if (elem != undefined) {
        elem.remove()        
    }

    map.delete(name)
}

chrome.runtime.sendMessage(
    "ijniofopekhpbjibljjgeigfdkpgfoml",
    {contentScriptQuery: "queryAchievements"},
    res => res.playerstats
        .achievements
        .filter(a => a.achieved === 1)
        .forEach(a => del_by_name(map, a.name))
);

get_random = function() {
    let items = Array.from(map.keys())

    return items[Math.floor(Math.random() * items.length)]
}
