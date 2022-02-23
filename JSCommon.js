//// JSCommon - refactoring

/*records performance of a function
like this:
var oraStart = new Date().getTime(),
	oraStop,
	durataExecSec;
call_to_a_function();
oraStop = new Date().getTime(),
durataExecSec = (oraStop - oraStart) / 1000;
recPerf(durataExecSec, SALDOC.FINDOC, ITELINES.RECORDCOUNT+SRVLINES.RECORDCOUNT, X.SYS.USER, 'call_to_a_function');
*/
function recPerf(durataExec_s, findoc, nrLnii, usr, partName) {
	//FNNAME = Function name
	//partName: function within function
    var caller = recPerf.caller.toString().split('()')[0],
        fnName = partName ? caller + '>' + partName : caller,
        createTblQ = 'create table CCCRECPERF (CCCRECPERF int not null identity(1,1) primary key, FNNAME VARCHAR(MAX) NOT NULL, ' +
        'DATA datetime not null default getDate(), DURATAEXECS FLOAT NOT NULL, ' +
        'findoc int not null, NRLINII float not null, usr int not null)',
        theQ = "if OBJECT_ID('dbo.CCCRECPERF') is null " + createTblQ;

    try {
        X.RUNSQL(theQ, null);

        X.RUNSQL("insert into CCCRECPERF (FNNAME, DURATAEXECS, FINDOC, NRLINII, USR) values ('" +
            fnName + "', " + durataExec_s + "," + findoc + "," + nrLnii + "," + usr + ")", null);
    } catch (err) {
        X.WARNING(err.message);
        debugger;
    }
}