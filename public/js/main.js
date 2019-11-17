const mockText='{"RED": [{"x": 12.32156, "y": 87.34362}, {"x": 25.32963, "y": 67.65422}, {"x": 81.23594, "y": 14.82645}], "YELLOW": [{"x": 41.23569, "y": 84.25649}, {"x": 73.26459, "y": 85.13698}], "GREEN": [{"x": 74.36953, "y": 11.25332}, {"x": 91.55669, "y": 81.36547}]}'
var data=JSON.parse(mockText);

function LoadData()
{
    LoadMarkerSet(data.RED,'RED',redStyle);
    LoadMarkerSet(data.GREEN,'GREEN',greenStyle);
    LoadMarkerSet(data.YELLOW,'YELLOW',yellowStyle);
}

function DisplayData()
{
    DisplayMarkerSet('RED');
    DisplayMarkerSet('GREEN');
    DisplayMarkerSet('YELLOW');
}
