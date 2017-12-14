#
#  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
#
BERYL_FILES = \
	../js/plugins/Beryl.js \
	../Gem/Beryl/Boot.js \
	../Gem/Clarity/DomainObjectModel.js \

CRYSTAL_FILES = \
	../js/plugins/Bloodstone.js \
	../js/plugins/Jasper.js \
	../js/plugins/Opal.js \

GEM_FILES = \
	../js/plugins/Gem.js \

RPG_FILES = \
	../js/rpg_managers.js \

SILVER_FILES = \
	../js/plugins/Silver.js \
	../js/plugins/Silver_Core.js \

WORK_FILES = \
	Makefile \

FILES = \
	$(CRYSTAL_FILES) \
	$(WORK_FILES)
	#
	#   Excludes:
	#      $(RPG_FILES)
    #

all: clean files links

clean:
	rm -f b.js b0.js bs.js
	rm -f c.js cd.js
	rm -f files files.new
	rm -f g.js
	rm -f i.html
	rm -f j.js jk.js
	rm -f m
	rm -f rc.js rm.js
	rm -f o.js o1.js oj.js
	rm -f s.js sc.js

files:
	echo $(FILES) >files.new
	mv files.new files

links:
	ln -s ../js/plugins/Beryl.js     	        b0.js
	ln -s ../Gem/Beryl/Boot.js      	        b.js
	ln -s ../js/plugins/Bloodstone.js	        bs.js
	ln -s ../Junk/Crystal.js	    	        c.js
	ln -s ../Gem/Clarity/DomainObjectModel.js   cd.js
	ln -s ../js/plugins/Gem.js    		        g.js
	ln -s ../index.html           		        i.html
	ln -s ../js/plugins/Jasper.js 		        j.js
	ln -s ../Junk/Junk.js         		        jk.js
	ln -s Makefile						        m
	ln -s ../js/rpg_core.js         	        rc.js
	ln -s ../js/rpg_managers.js			        rm.js
	ln -s ../js/plugins/Opal.js	    	        o.js
	ln -s ../js/plugins/Opal1.js		        o1.js
	ln -s ../Junk/Jasper.js         	        oj.js
	ln -s ../js/plugins/Silver.js 		        s.js
	ln -s ../js/plugins/Silver_Core.js 	        sc.js

wc:
	#
	#   Excludes:
	#      $(RPG_FILES)
	#
	wc -l \
        $(BERYL_FILES) \
	    $(CRYSTAL_FILES) \
	    $(GEM_FILES) \
	    $(SILVER_FILES) \
	    $(WORK_FILES)
