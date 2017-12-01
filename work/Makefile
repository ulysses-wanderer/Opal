#
#  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
#
CRYSTAL_FILES = \
	../js/plugins/Crystal.js \
	../js/plugins/Jasper.js \
	../js/plugins/Opal.js

RPG_FILES = \
	../js/rpg_managers.js

WORK_FILES = \
	Makefile

FILES = \
	$(CRYSTAL_FILES) \
	$(WORK_FILES)
	#
	#   Excludes:
	#      $(RPG_FILES)
    #

all: clean files links

clean:
	rm -f c.js
	rm -f files files.new
	rm -f j.js jk.js
	rm -f m
	rm -f rm.js
	rm -f o.js op.js

files:
	echo $(FILES) >files.new
	mv files.new files

links:
	ln -s ../js/plugins/Crystal.js	c.js
	ln -s ../js/Plugins/Jasper.js   j.js
	ln -s ../Junk/Junk.js         	jk.js
	ln -s Makefile					m
	ln -s ../js/rpg_managers.js		rm.js
	ln -s ../js/plugins/Opal1.js	o.js
	ln -s ../js/plugins/Opal.js	    op.js

wc:
	#
	#   Excludes:
	#      $(RPG_FILES)
	#
	wc -l \
	    $(CRYSTAL_FILES) \
	    $(WORK_FILES)
