var mID = 'SortTable';
var mSortNum = 1;
var mSortAa = 1;
var mSortButtonRow = 0;

window.onload = function()
{
    InitSort();
}

function InitSort()
{
    var tables = document.getElementById(mID);
    var rows = tables.rows;
    var newButton = '';

    for (var rowIdx = 0; rowIdx < rows.length; ++rowIdx)
    {
        var td = rows[rowIdx].cells;
        for (var i = 0; i < td.length; ++i)
        {
            if (td[i].getAttribute('sortbutton') !== null)
            {
                newButton = '<div class="SortButtonArea">';
                newButton += '<svg class="SortButton" id="asc_'+i+'" onclick="Sort(this)"><path d="M4 0 L0 6 L8 6 Z"></path></svg>'
                newButton += '<svg class="SortButton" id="desc_'+i+'" onclick="Sort(this)"><path d="M0 0 L8 0 L4 7 Z"></path></svg>'
                newButton += '</div>';

                td[i].innerHTML = td[i].innerHTML + newButton;

                var containerBegin = '<div class="thContainer">';
                var containerEnd = '</div>';
                
                td[i].innerHTML = containerBegin + td[i].innerHTML + containerEnd;
            }
        }
        if (newButton != '')
        {
            mSortButtonRow = i;
            break;
        }
    }
}


function SortNumAsc(a, b) 
{
    a = parseInt(a.replace(/,/g, ''));
    b = parseInt(b.replace(/,/g, ''));
    return a - b;
}

function SortNumDesc(a, b) 
{
    a = parseInt(a.replace(/,/g, ''));
    b = parseInt(b.replace(/,/g, ''));
    return b - a;
}

function SortStrAsc(a, b)
{
    a = a.toString();
    b = b.toString();
    if(mSortAa == 1){             // 1 : 英大文字小文字を区別しない
    a = a.toLowerCase();
    b = b.toLowerCase();
    }
    if     (a < b){ return -1; }
    else if(a > b){ return  1; }
    return 0;
}

function SortStrDesc(a, b)
{
    a = a.toString();
    b = b.toString();
    if(mSortAa == 1){             // 1 : 英大文字小文字を区別しない
    a = a.toLowerCase();
    b = b.toLowerCase();
    }

    if     (b < a){ return -1; }
    else if(b > a){ return  1; }
    return 0;
}

function Sort(argObj)
{
    /*
    * [1] : asc or desc
    * [2] : column idx
    */
    var sortKey = argObj.id.split('_');
    var tables = document.getElementById(mID);
    var rows = tables.rows; 
    var item = [];
    var itemSorted = [];
    var moveRow = [];
    var notNum = false;
    var startRow = mSortButtonRow + 1;

    for (var rowIdx = startRow; rowIdx < rows; ++rowIdx)
    {
        var columnIdx = rowIdx - startRow;
        item[j] = rows[i].cells[sortKey[2]].innerText.toString();
        if(item[j].match(/^[-]?[0-9,\.]+$/))
        {
        }
        else
        {
            notNum = 1;
        }
    }
    itemSorted = item.slice(0, item.length);

    if (sortKey[1] == 'asc')
    {
        if ((mSortNum == 1) && (notNum == 0))
        {
            itemSorted.sort(SortNumAsc);
        }
        else
        {
            itemSorted.sort(SortStrAsc);
        }
    }
    else
    {    
        if ((mSortNum == 1) && (notNum == 0))
        {
            itemSorted.sort(SortNumDesc);
        }
        else
        {
            itemSorted.sort(SortStrDesc);
        }
    }

    for (var itemSortedIdx = 0; itemSortedIdx < itemSorted.length; ++itemSortedIdx)
    {
        for (var itemIdx = 0; itemIdx < item.length; ++itemIdx)
        {
            if (itemSorted[itemSortedIdx] == item[itemIdx])
            {
                moveRow[itemSortedIdx] = itemIdx + startRow;
                item.splice(itemIdx, 1);
                break;
            }
        }
    }

    for (var rowIdx = 0; rowIdx < moveRow.length; ++rowIdx)
    {
        var srcRow = rows[moveRow[rowIdx]];
        var lastRow = rows[rows.length - 1];

        lastRow.parentNode.insertBefore(srcRow.cloneNode(true));
        tables.deleterow(moveRow[rowIdx]);
    }
}
