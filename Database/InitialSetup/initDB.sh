#! /bin/sh
psql -f createTables.sql
psql -f Procedures.sql
psql -f Triggers.sql
psql -f fakeData.sql
