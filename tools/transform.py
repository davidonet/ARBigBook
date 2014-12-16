import xml.sax

class ABContentHandler(xml.sax.ContentHandler):
	def __init__(self):
		xml.sax.ContentHandler.__init__(self)
		self.text = ""
		self.fout = open('../src/auzoo_edited.xml', 'w')

	def startElement(self, name, attrs):
		if(name == "w:t"):
			self.text += "<p>"

	def endElement(self, name):
		if(name == "w:t"):
			self.text += "</p>\n"			

	def characters(self, content):
		self.text += content

	def endDocument(self):
		self.text += "</root>\n"
		self.fout.write(self.text)

	def startDocument(self):
		self.text += "<?xml version='1.0'?>\n\n<root>"


def main(sourceFileName):
	source = open(sourceFileName)
	xml.sax.parse(source, ABContentHandler())

if __name__ == "__main__":
	main("../src/auzoo.xml")