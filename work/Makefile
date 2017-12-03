#
#  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
#
BERYL_FILES = \
	../Gem/Beryl/Boot.js

CRYSTAL_FILES = \
	../js/plugins/Bad.js \
	../js/plugins/Good.js \
	../js/plugins/Jasper.js \
	../js/plugins/Opal.js

RPG_FILES = \
	../js/rpg_managers.js

SILVER_FILES = \
	../js/plugins/Silver.js

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
	rm -f b.js bad.js
	rm -f c.js
	rm -f files files.new
	rm -f g.js
	rm -f i.html
	rm -f j.js jk.js
	rm -f m
	rm -f rc.js rm.js
	rm -f o.js o1.js oj.js
	rm -f s.js

files:
	echo $(FILES) >files.new
	mv files.new files

links:
	ln -s ../Gem/Beryl/Boot.js      b.js
	ln -s ../js/plugins/Bad.js    	bad.js
	ln -s ../Junk/Crystal.js	    c.js
	ln -s ../js/plugins/Good.js   	g.js
	ln -s ../js/plugins/Jasper.js 	j.js
	ln -s ../index.html           	i.html
	ln -s ../Junk/Junk.js         	jk.js
	ln -s Makefile					m
	ln -s ../js/rpg_core.js         rc.js
	ln -s ../js/rpg_managers.js		rm.js
	ln -s ../js/plugins/Opal.js	    o.js
	ln -s ../js/plugins/Opal1.js	o1.js
	ln -s ../Junk/Jasper.js         oj.js
	ln -s ../js/plugins/Silver.js 	s.js

wc:
	#
	#   Excludes:
	#      $(RPG_FILES)
	#
	wc -l \
        $(BERYL_FILES) \
	    $(CRYSTAL_FILES) \
	    $(SILVER_FILES) \
	    $(WORK_FILES)
