/*
 *
 *
脚本功能：
软件版本：&&
下载地址：&&
脚本作者：李小白
更新时间：2023.07.28
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************


[rewrite_local]

^https:\/\/boomboy\d+\.fkdzz\.bueryx\.com:\d+\/(equip\/wear|login|promotetree\/query) url script-response-body https://raw.githubusercontent.com/xiaobai-blog/Scripts/48a7557e39ae4229535a2145c8afc0450e2c18a5/sgb.js

[mitm] 
hostname = *fkdzz.bueryx*
*
*
*/
const responseBody = $response.body; 
const uinMatch = responseBody.match(/"uin":(\d+),/);

if (uinMatch && (uinMatch[1] !== "16914420" && uinMatch[1] !== "11111" && uinMatch[1] !== "16914420" && uinMatch[1] !== "11111" && uinMatch[1] !== "11111")) {

    $notify("未授权", "添加l648226460授权");
    $done();
}


const modifiedBodyBook2 = responseBody.replace(/"bookId":2,"relate":\[.*?\],"/, '"bookId":2,"relate":[{"id":210112340,"level":5},{"id":210210000,"level":10},{"id":220202000,"level":10},{"id":230200300,"level":10},{"id":240200040,"level":10},{"id":210310000,"level":10},{"id":220301000,"level":10},{"id":230300100,"level":10},{"id":240300010,"level":10}, {"id":210400000,"level":5},{"id":210500000,"level":10},{"id":220500000,"level":10},{"id":230500000,"level":10},{"id":240500000,"level":10},{"id":210600000,"level":10},{"id":220600000,"level":10},{"id":230600000,"level":10},{"id":240600000,"level":10},{"id":210700000,"level":5}],"');

const modifiedBodyBook1 = modifiedBodyBook2.replace(/"bookId":1,"relate":\[.*?\],"/, '"bookId":1,"relate":[{"id":110112000,"level":5},{"id":120223000,"level":10},{"id":110210000,"level":4},{"id":130300100,"level":10},{"id":120301000,"level":10},{"id":110310000,"level":4},{"id":110412300,"level":10},{"id":110500000,"level":30},{"id":120500000,"level":10},{"id":130512000,"level":5},{"id":110610000,"level":10},{"id":120620000,"level":10},{"id":110710000,"level":4},{"id":120723000,"level":20},{"id":110810000,"level":10},{"id":120801000,"level":16},{"id":130800100,"level":16},{"id":110912000,"level":5},{"id":111010000,"level":20},{"id":121020000,"level":20},{"id":111112000,"level":20},{"id":121100120,"level":40},{"id":111210000,"level":20},{"id":121220000,"level":20},{"id":111300000,"level":20},{"id":121300000,"level":20}],"');


const modifiedBody = responseBody.replace(/"promoteIds":\[.*?\],"chapter":/, '"promoteIds":[2360,1026],"chapter":');

const modifiedBodyScript2 = modifiedBody.replace(/"equips":\[(.*?)\]/g, (match, equipsData) => {

    const modifiedEquipsData = equipsData.replace(/"defId":(\d{4})(\d{2}),.*?"level":(\d+)/g, (match, p1, p2, p3) => {
        const newDefId = p1 + "14";
        return `"defId":${newDefId},"wid":${p1}${p2},"level":180,"num":1`;
    });

    return `"equips":[${modifiedEquipsData}]`;
});


const regex = /"id":(\d+),"level":(\d+),"star":\d+,"point":{"pointId":(\d+),"level":(\d+),"stepLevel":(\d+)}/g;
const modifiedBodyWithNewData = modifiedBodyScript2.replace(regex, '"id":$1,"level":180,"star":120,"point":{"pointId":$3,"level":$4,"stepLevel":$5}');

const modifiedBodyWithCurr = modifiedBodyWithNewData.replace(/"curr":\d+,"petPack/g, '"curr":1100028,"petPack');
const modifiedBodyWithDefId = modifiedBodyWithCurr.replace(/"defId":\d+,"step":\d+,"level":\d+/g, '"defId":1100028,"step":0,"level":200');

const modifiedBodyWithDecors = modifiedBodyWithDefId.replace(/"decors":\[(.*?)\]/g, (match, decorsData) => {
    const modifiedDecorsData = decorsData.replace(/"defId":(\d+)(\d{2}),.*?"num":(\d+),.*?"pos":(\d+)/g, (match, p1, p2, p3, p4) => {
        const newDefId = p1 + "14";  
        return `"defId":${newDefId},"num":${p3},"pos":${p4}`;
    });

    return `"decors":[${modifiedDecorsData}]`;
});

$done({ body: modifiedBodyWithDecors });
