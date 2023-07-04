/**
 * 랜덤값 생성
 *
 * @param lengthParam
 *
 * @returns
 *
 * 확인
 */
const randomId = (lengthParam: number = 10) => {
	const length = lengthParam > 10 ? 10 : lengthParam;

	return Math.random()
		.toString(36)
		.substring(2, length + 2);
};

/**
 * 문자열 계좌번호를 중간에 -(대시)를 넣은 형태로 변환
 *
 * @param value
 *
 * @returns string
 *
 * 확인
 */
const formatAccountNumber = (value: string | number): string => {
	if (!value) {
		return '';
	}

	let target: string = '';

	if (typeof value === 'number') {
		target = String(value);
	} else {
		target = value;
	}

	if (target.length === 12) {
		return `${target.substring(0, 3)}-${target.substring(3, 6)}-${target.substring(6, 12)}`;
	} else if (target.length === 11) {
		return `${target.substring(0, 3)}-${target.substring(3, 5)}-${target.substring(5, 11)}`;
	} else {
		return '';
	}
};

/**
 * 6자리 숫자의 쉼표단위를 k 로 바꾸고 뒤에 세자리를 없앤다
 *
 * @param value
 * @param isOneKShorten
 *
 * @returns string
 *
 * 확인
 */
const decimalSeparator = (value: string | number, isOneKShorten: boolean = false) => {
	if (!value) {
		return '0';
	}
	let target: string = '';

	if (typeof value === 'string') {
		target = value;
	} else if (typeof value === 'number') {
		target = String(value);
	}

	if (target.length > 6 && isOneKShorten) {
		target = target.slice(0, target.length - 3);
		target += 'k';
	}

	return target.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 문자열 s의 바이트 수 리턴.
 *
 * @param s
 *
 * @returns
 *
 * 확인
 */
const sbGetByteLength = (s: string) => {
	let len: number = 0;

	for (let i = 0; i < s.length; i++) {
		const _ch: number = s.charCodeAt(i);

		if (_ch >= 0x0080 && _ch <= 0xffff) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
};

/**
 * CharCode 를 기준으로 바이트를 계산하여 문자열 리턴
 *
 * @param s
 * @param l
 *
 * @returns
 *
 * 확인
 */
const sbCutByteUesCharCode = (s: string, l: number) => {
	let cutI = 0;
	let len = 0;

	for (let i = 0; i < s.length; i++) {
		const _ch = s.charCodeAt(i);

		if (_ch >= 0x0080 && _ch <= 0xffff) {
			len += 2;
		} else {
			len++;
		}

		if (len > l) {
			cutI = i;
			break;
		}
	}

	return s.substring(0, cutI);
};

/**
 * 계좌번호마스킹: 4번째~7번째
 * stringUtil
 *
 * @param str
 *
 * @returns string
 *
 * 확인
 */
const sbMaskingAccountNo = (strParam: string) => {
	let str = strParam;

	if (!str) return str;

	if (str.indexOf('-') > -1) {
		if (str.length === 14) {
			return `${str.slice(0, 3)}-●●●-●${str.slice(9, 14)}`;
		} else if (str.length === 13) {
			return `${str.slice(0, 3)}-●●-●●${str.slice(9, 13)}`;
		}
	} else {
		if (str.length < 7) return str;
		str = `${str.substring(0, 3)}●●●●${str.substring(7, str.length)}`;
		return str;
	}

	return str;
};

/**
 * 숫자값만 얻어온다. (숫자값 이외는 모두 필터링)
 *
 * @param {string | number} strTemp 원본문자열
 * @param {boolean} procZero replace후에 남은 문자열이 '0'일 때  true(default): 공백리턴, false: '0' 리턴
 *
 * @return {string} 필터링된 문자열
 *
 * 확인
 */
const sbGetOnlyNumber = (strTemp: string | number = '', procZero: boolean = true): string => {
	const filter = /[^0-9]/g;
	let number = strTemp.toString().replace(filter, '');

	if (procZero === true && number === '0') {
		number = '';
	}

	return number;
};

/**
 * 전화번호(휴대폰, 일반전화) : 뒤 4자리 마스킹
 *
 * @param str
 *
 * @returns
 *
 * 확인
 */
const sbMaskingPhone = (str: string) => {
	if (!str || str.length < 5) return str;
	//	return str.substring(0, str.length - 4) + "****";
	return `${str.substring(0, str.length - 4)}●●●●`;
};

/**
 * 직원번호 마스킹 리턴한다.
 * 마스킹 규칙 : 앞 5자리 마스킹처리(김근영수석님)
 *
 * @param {string | numer} strParam 직원번호
 *
 * @returns 마스킹이 적용된 직원번호
 *
 * 확인
 */
const sbMaskingStaffNum = (strParam: string | number = '') => {
	let maskingStr = '';
	let str: string = strParam.toString();

	// if (typeof str === 'number') {
	// 	str += '';
	// }
	if (str === '') return str;

	// 공백 제거
	str = str.replace(/ /g, '');
	for (let i = 0; i < str.length; i++) {
		if (i < 5) {
			maskingStr += '●';
		} else {
			maskingStr += str.charAt(i);
		}
	}

	return maskingStr;
};

/**
 * str에 특수문자가 포함되어 있으면 true반환 참고 : 천지인 키보드에서 아래아등 입력안되는 오류로 인해 추가함 :
 * |\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55
 *
 * @param str
 *
 * @returns
 *
 * 확인
 */
const sbIsSpecialChar = (str: string) => {
	return !/^[ㄱ-ㅎㅏ-ㅣ가-힝a-zA-Z0-9\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55]*$/.test(str);
};

/**
 * 화면에 html 태그가 그대로 보이는 경우 사용.
 *
 * @param htmlStr
 *
 * @returns
 *
 * 확인
 */
const sbHtmlUnescape = (htmlStr: string) => {
	let ret = '';

	ret = htmlStr
		.replace(/&lt;/g, '<')
		.replace(/&quot;/g, '"')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, ';');
	return ret;
};

/**
 * 문자열중 특정한문자를 입력받은 문자로 치환 / [ 손철주 2017-12-23 수정 ] 지우지마시요.
 *
 * @param orgStr
 * @param srcStr
 * @param repStr
 *
 * @returns
 *
 * 확인
 */
const sbFncReplaceAll = (orgStr: string, srcStr: string, repStr: string) => {
	return orgStr.split(srcStr).join(repStr);
};

/**
 * 문자열 s의 바이트수가 len 보다 크면 마지막 문자열(깨진문자)을 잘라서 리턴.
 *
 * @param s
 * @param len
 *
 * @returns
 *
 * 확인
 */
const sbSafeStr = (s: string, len: number) => {
	if (s && len && sbGetByteLength(s) > len) return s.substring(0, s.length - 2);
	else return s;
};

/**
 * 영문성명 마스킹 리턴한다.
 *
 * @param 영문성명
 *
 * @returns 마스킹이 적용된 영문성명
 *
 * 확인
 */
const sbMaskingEngName = (str: string) => {
	if (str === '') return '';

	let cnt = 0;
	const nameArr = str.split(' ');

	// 영문성명 최대 20Byte
	if (sbGetByteLength(str) <= 20) {
		for (let i = 0; i < str.length; i++) {
			if (str.charAt(i) === ' ') cnt++;
		}

		if (cnt === 0) {
			// 공백 없는 경우 : 뒷4자리 마스킹
			return `${str.substring(0, str.length - 4)}●●●●`;
		} else if (cnt === 1) {
			// 공백 1개 : 공백이후 마스킹
			let masking = '';

			for (let i = 0; i < nameArr[1].length; i++) {
				masking += '●';
			}
			return `${nameArr[0]} ${masking}`;
		} else {
			// 공백 2개 이상 : 맨 앞,뒤 제외한 가운데 마스킹
			let masking = '';
			const maskingLength = str.length - nameArr[0].length - nameArr[cnt].length;

			for (let i = nameArr[0].length; i < nameArr[0].length + maskingLength; i++) {
				if (str.charAt(i) === ' ') {
					masking += ' ';
				} else {
					masking += '●';
				}
			}
			return `${nameArr[0]} ${masking} ${nameArr[cnt]}`;
		}
	}

	return str;
};

/**
 * 서명용 날짜, 시간 포멧
 *
 * @param str 6자리 스트링
 * @param type "D" xx.xx.xx, "T" xx:xx:xx
 * @param sep 나누고 싶은 문자
 *
 * @returns string
 *
 * 확인
 */
const sbSignDTFormat = (str: string, type: string, sep: string) => {
	let dtRet = '';
	let dtSep = '';

	if (sep !== undefined && sep != null) {
		dtSep = sep;
	} else if (type === 'D') {
		dtSep = '.';
	} else {
		dtSep = ':';
	}

	if (type === 'D') {
		dtRet = str.substr(0, 4) + dtSep + str.substr(4, 2) + dtSep + str.substr(6, 2);
	} else {
		dtRet = str.substr(0, 2) + dtSep + str.substr(2, 2) + dtSep + str.substr(4, 2);
	}
	return dtRet;
};

const euckr = {
	korean: `가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜
	괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄
	껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남
	납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨
	뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗
	동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑
	뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례
	롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁
	먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍
	및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤
	붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘
	삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠
	쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘
	쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽
	얾엄업없엇었엉엊엌엎에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜
	웝웠웡웨웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊점접
	젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓징짖짙짚짜짝짠짢
	짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻찼창찾채책챈챌챔챕챗챘챙챠챤
	챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑
	캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄
	탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀
	팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗
	피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠
	훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝`,
};

/**
 * euc-kr 해당 한글만 존재하는지 검사
 *
 * @param str [String] 대상 문자열
 * @returns [Boolean] euc-kr범위 여부(true : 범위내 문자, false : 범위에 포함되지 않는 문자열 포함)
 */
const sbHasOnlyEucKrKorean = (str: string) => {
	if (typeof str !== 'string') return false;
	return str.split('').every((v) => {
		const c = v.charCodeAt(0);

		return c < 0xac00 || c > 0xd7a3 || euckr.korean.indexOf(v) >= 0;
	});
};

/**
 * query param이 포함 된 url과 찾을 key를 넣으면 value를 return
 *
 * @param href  query param이 포함 된 url
 * @param key   찾을 key
 * @returns 	찾을 key의 value
 */

const getQueryParam = (href: string, key: string) => {
	const i = href.indexOf(`${key}=`);

	const start = href.slice(i, href.length);

	const j = start.indexOf('&');

	let value = start;

	if (j > -1) {
		value = start.slice(0, j);
	}

	const withoutKey = value.slice(key.length + 1, value.length);

	return withoutKey;
};

/**
 *
 * @returns
 */
const uuidv4 = function () {
	return `10000000${-1e3}${-4e3}${-8e3}${-1e11}`.replace(/[018]/g, (c: any) =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
	);
};

const parseJSON = (value: string) => {
	try {
		return JSON.parse(value);
	} catch (e) {
		return null;
	}
};

const stringUtil00 = {
	randomId,
	formatAccountNumber,
	decimalSeparator,
	sbMaskingAccountNo,
	sbGetByteLength,
	sbCutByteUesCharCode,
	sbGetOnlyNumber,
	sbMaskingPhone,
	sbMaskingStaffNum,
	sbIsSpecialChar,
	sbHtmlUnescape,
	sbFncReplaceAll,
	sbSafeStr,
	sbMaskingEngName,
	sbSignDTFormat,
	sbHasOnlyEucKrKorean,
	getQueryParam,
	uuidv4,
	parseJSON,
};

export default stringUtil00;
