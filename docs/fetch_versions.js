"use strict";
((document) => {
    async function loadJDocDir() {
        return await fetch("https://osp.rk0cc.xyz/javadoc/dir.json", {
            method: "GET",
            redirect: "follow"
        }).then(resp => resp.json());
    }

    const jdgp = document.head.querySelector("meta[name=javagroup]").getAttribute("content");
    const jdai = document.head.querySelector("meta[name=javaartifact]").getAttribute("content");

    var headerBody = document.createElement("h1");
    headerBody.appendChild(document.createTextNode("Package: xyz.rk0cc." + jdgp + ":" + jdai));
    document.body.appendChild(headerBody);

    var vul = document.createElement("ul");
    document.body.appendChild(vul);

    loadJDocDir()
        .then((jdoc) => {
            var targetNode = jdoc.filter(j => j.group === jdgp && j.artifact == jdai);

            if (targetNode.length !== 1) throw new Error("Duplicated package found");

            for (const ver of targetNode[0].versions.released) {
                var l = document.createElement("a");
                l.href = "./" + ver + "/";
                l.appendChild(document.createTextNode(ver));
                var li = document.createElement("li");
                li.appendChild(l);
                vul.appendChild(li);
            }
        });
})(document);
