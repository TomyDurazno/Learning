<Query Kind="Program" />

#load "MultilineIO"
void Main()
{
	var input = new MultilineIO();
	
	input.Create(i => {			
	MyUtils.WriteTxtToDesktop(ParseTemplate(i.SplitBy(Environment.NewLine)), finalFileName);	
	});
}

string finalFileName => "loader.html";

string templateName => "/Loader Template.txt";

string parentFolder => Util.CurrentQueryPath.Replace("\\" + $"{ Util.CurrentQuery.Name }.linq", string.Empty);

string path => parentFolder + templateName;

string replaceKey => "**REPLACE**";

IEnumerable<string> ParseTemplate(IEnumerable<string> urls)
{
	var lines = urls.Select(s => "https://" + s);

	var template = MyUtils.ReadTxt(path);

	var toReplace = lines.SelectMany((l, i) => i == 0 ? new string[] { $"'{l}'" } : new string[] { $", '{l}'" }).Concatenate();

	return template.Select(s => s.Contains(replaceKey) ? toReplace : s);
}