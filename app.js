/**
 * 어린이 농구 기초 수비 마스터 (app.js)
 * 1:1 / 2:2 / 3:3 / 5:5 다인 경기 모드 지원
 * - 공격수: 항상 빨간색 (Red)
 * - 수비수: 파란색 (Blue)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 4가지 모드별 퀴즈 데이터 정의 =================
  const modeData = {
    // ---------------- 1대1 기초 모드 (10문제) ----------------
    '1v1': [
      {
        id: 1,
        title: "정면 3점슛 라인 (탑, Top)",
        shortName: "정면 3점",
        situationDesc: "빨간색 공격수가 <strong>정면 3점 라인 밖</strong>에서 골대를 향해 서 있어요!",
        attacker: { x: 300, y: 470, angle: 0, label: "공격자 (빨강)" },
        axisTarget: { x: 300, y: 470 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 360, angle: 180, label: "팔 하나 거리", isCorrect: true, feedbackTitle: "완벽한 정답이에요! 짝짝짝!", feedbackDesc: "골대와 공격수 사이 일직선에서 '팔 하나 간격'을 딱 유지했어요! 슛과 양쪽 돌파를 모두 막을 수 있어요." },
          B: { x: 300, y: 410, angle: 180, label: "바짝 붙기", isCorrect: false, feedbackTitle: "조심해요! 너무 가까워요!", feedbackDesc: "공격수 발에 너무 바짝 붙으면, 공격수가 휙 방향을 바꾸었을 때 발이 엉켜 순식간에 돌파당해요!" },
          C: { x: 300, y: 240, angle: 180, label: "멀리 서기", isCorrect: false, feedbackTitle: "아쉬워요! 너무 멀어요!", feedbackDesc: "너무 멀리 떨어져 서 있으면 공격수가 아무 방해도 받지 않고 시원하게 3점슛을 쏴버려요!" }
        },
        locationTipTitle: "정면(Top)에서의 발 모양 & 수비 요령",
        locationTipDesc: "정면에서는 공격수가 좌우 어디로든 뚫고 갈 수 있어요. 두 발을 어깨너비보다 1.5배 넓게 벌리고, 공격수를 정면으로 마주보며 양손을 활짝 펼쳐야 해요!",
        voiceScript: "정면 3점슛 라인에서는 공격수가 왼쪽과 오른쪽 어디로든 돌파할 수 있어요. 두 발을 넓게 벌리고 빨간색 공격수를 정면으로 바라보며 팔 하나 간격을 지키세요!"
      },
      {
        id: 2,
        title: "오른쪽 윙 45도 (Right Wing)",
        shortName: "우측 45도",
        situationDesc: "빨간색 공격수가 <strong>오른쪽 45도 외곽</strong>에서 골대를 향해 공격을 노리고 있어요!",
        attacker: { x: 455, y: 415, angle: -28, label: "공격자 (우측 45도)" },
        axisTarget: { x: 455, y: 415 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 380, y: 305, angle: 152, label: "중앙 차단 위치", isCorrect: true, feedbackTitle: "대단해요! 최고의 위치 선정!", feedbackDesc: "골대와 공격수 사이에서 위험한 코트 중앙(골밑) 진로를 차단하고 사이드로 유도하는 모범 발자국 각도예요!" },
          B: { x: 425, y: 355, angle: 152, label: "코앞에 붙기", isCorrect: false, feedbackTitle: "위험해요! 너무 가까워요!", feedbackDesc: "발이 너무 달라붙어 있으면 공격수의 폭발적인 첫 발 스피드를 따라가지 못해 뚫려요!" },
          C: { x: 490, y: 285, angle: 110, label: "사이드 쪽 비우기", isCorrect: false, feedbackTitle: "앗! 골밑 진로가 텅 비었어요!", feedbackDesc: "골대와 공격수 사이의 중심축을 벗어나 있어서 공격수가 골밑으로 곧장 직진할 수 있어요." }
        },
        locationTipTitle: "45도 윙에서의 발 모양 & 수비 요령",
        locationTipDesc: "45도에서는 골밑 중앙으로 파고드는 것이 가장 위험해요! 중앙 쪽 발을 살짝 앞에 두고 비스듬한 스탠스를 취해 공격수를 사이드라인으로 몰아내세요.",
        voiceScript: "오른쪽 45도에서는 가장 위험한 골밑 중앙으로 들어오지 못하게 막는 것이 핵심이에요. 가운데 발을 앞에 두고 사이드 쪽으로 몰아내세요!"
      },
      {
        id: 3,
        title: "왼쪽 윙 45도 (Left Wing)",
        shortName: "좌측 45도",
        situationDesc: "빨간색 공격수가 <strong>왼쪽 45도 지역</strong>에서 골대를 조준하고 있어요!",
        attacker: { x: 145, y: 415, angle: 28, label: "공격자 (좌측 45도)" },
        axisTarget: { x: 145, y: 415 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 175, y: 355, angle: -152, label: "바짝 붙기", isCorrect: false, feedbackTitle: "앗! 쉽게 뚫려버려요!", feedbackDesc: "거리가 너무 좁아 상대의 빠른 드라이브인에 반응할 시간적 여유가 없어요." },
          B: { x: 220, y: 305, angle: -152, label: "중앙 방어 위치", isCorrect: true, feedbackTitle: "정답입니다! 훌륭해요!", feedbackDesc: "골대와 공격수를 잇는 축선 위에서 팔 하나 거리를 지켜 골밑 진입을 완벽히 차단했어요!" },
          C: { x: 110, y: 285, angle: -110, label: "엉뚱한 외곽", isCorrect: false, feedbackTitle: "방향이 어긋났어요!", feedbackDesc: "골대 방향이 아닌 엉뚱한 바깥을 보고 있어서 공격수가 편안하게 골밑으로 달릴 수 있어요." }
        },
        locationTipTitle: "왼쪽 45도에서의 발 모양 & 수비 요령",
        locationTipDesc: "왼쪽 45도에서도 중앙 쪽 발로 골밑 길목을 막아주는 스탠스를 취하세요. 시선은 공격수의 배꼽에 고정!",
        voiceScript: "왼쪽 45도에서도 골대와 공격수 사이 일직선을 지켜야 해요. 팔 하나 간격에서 한 손은 높이, 한 손은 낮게 펼쳐주세요!"
      },
      {
        id: 4,
        title: "오른쪽 코너 3점 (Right Corner)",
        shortName: "우측 코너",
        situationDesc: "빨간색 공격수가 <strong>오른쪽 코너 구석</strong>에서 공을 잡았어요! 등 뒤가 아웃라인이에요.",
        attacker: { x: 530, y: 160, angle: -80, label: "공격자 (우측 코너)" },
        axisTarget: { x: 530, y: 160 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 390, y: 120, angle: 100, label: "골밑에서 대기", isCorrect: false, feedbackTitle: "너무 멀어요! 오픈 3점슛!", feedbackDesc: "코너 3점슛은 거리가 짧아 성공률이 높아요! 이렇게 멀리 떨어지면 3점슛을 그대로 헌납해요." },
          B: { x: 485, y: 160, angle: 100, label: "코앞에 붙기", isCorrect: false, feedbackTitle: "엔드라인 돌파 허용!", feedbackDesc: "너무 바짝 붙으면 공격수가 베이스라인을 타고 쏙 빠져나가 레이업을 쏴요!" },
          C: { x: 450, y: 140, angle: 100, label: "코너 봉쇄 위치", isCorrect: true, feedbackTitle: "완벽한 코너 수비 성공!", feedbackDesc: "베이스라인 돌파를 완벽히 막고 코트 구석으로 상대를 가두었어요! 사이드라인이 제6의 수비수가 됩니다!" }
        },
        locationTipTitle: "코너에서의 발 모양 & 수비 요령",
        locationTipDesc: "코너는 뒤와 옆이 선으로 막혀있어요! 골대 밑으로 파고드는 베이스라인 쪽 발을 단단히 닫아주면 공격수를 코너에 꽁꽁 가둘 수 있어요!",
        voiceScript: "코너는 뒤와 옆이 선으로 막혀 있는 명당이에요. 골대 밑으로 파고들지 못하게 베이스라인을 막고 코너에 가두세요!"
      },
      {
        id: 5,
        title: "왼쪽 코너 3점 (Left Corner)",
        shortName: "좌측 코너",
        situationDesc: "빨간색 공격수가 <strong>왼쪽 코너 구석</strong>에서 슛 기회를 노리고 있어요!",
        attacker: { x: 70, y: 160, angle: 80, label: "공격자 (좌측 코너)" },
        axisTarget: { x: 70, y: 160 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 150, y: 140, angle: -100, label: "베이스라인 차단", isCorrect: true, feedbackTitle: "정답! 환상적인 위치 선정!", feedbackDesc: "골대 밑으로 빠져나가는 길목을 발로 딱 막고, 슛을 쏠 때 바로 손을 뻗을 수 있는 완벽한 위치예요!" },
          B: { x: 115, y: 160, angle: -100, label: "바짝 밀착", isCorrect: false, feedbackTitle: "파울 위험 & 돌파 허용!", feedbackDesc: "너무 달라붙으면 상대가 살짝 훼이크만 줘도 파울을 범하거나 쉽게 뒤를 내주게 돼요." },
          C: { x: 210, y: 120, angle: -100, label: "너무 먼 거리", isCorrect: false, feedbackTitle: "슛을 너무 쉽게 줘요!", feedbackDesc: "거리가 너무 멀어서 상대가 여유롭게 조준하고 슛을 쏠 수 있어요." }
        },
        locationTipTitle: "왼쪽 코너 수비의 발 모양 포인트",
        locationTipDesc: "골대 밑으로 향하는 베이스라인 진로에 발을 먼저 딛고 서세요. 하이핸드로 시야를 가려주면 백발백중 슛을 막을 수 있어요!",
        voiceScript: "왼쪽 코너에서도 골대 밑으로 들어오지 못하게 몸으로 길목을 막으세요. 한 손을 번쩍 들어 슛 각도를 좁혀주는 것이 비법입니다!"
      },
      {
        id: 6,
        title: "골밑 바로 앞 (로우 포스트, Low Post)",
        shortName: "골밑/페인트",
        situationDesc: "빨간색 공격수가 <strong>골대 바로 앞 골밑</strong>에서 공을 잡았어요! 골밑 슛 위기예요!",
        attacker: { x: 300, y: 165, angle: 0, label: "공격자 (골밑)" },
        axisTarget: { x: 300, y: 165 },
        otherPlayers: [],
        correctChoice: 'B',
        choices: {
          A: { x: 230, y: 140, angle: 180, label: "옆으로 비켜서기", isCorrect: false, feedbackTitle: "골대 정면이 비었어요!", feedbackDesc: "골대 정면을 비워두면 공격수가 가볍게 골밑 슛이나 레이업을 성공시켜요!" },
          B: { x: 300, y: 115, angle: 180, label: "골대 앞 수비벽", isCorrect: true, feedbackTitle: "슈퍼 수비 성공! 정답이에요!", feedbackDesc: "골대 바로 앞에서 등을 기대지 못하게 두 발로 튼튼히 버티며 두 손을 번쩍 들어 슛을 방해했어요!" },
          C: { x: 300, y: 55, angle: 180, label: "골대 뒤로 숨기", isCorrect: false, feedbackTitle: "골대 뒤는 안 돼요!", feedbackDesc: "골대 뒤로 물러서면 수비수가 없는 것과 다름없어요. 편안한 골밑슛을 내주게 됩니다." }
        },
        locationTipTitle: "골밑에서의 발 모양 & 스탠스",
        locationTipDesc: "골밑에서는 공격수와 골대 사이를 절대 비우면 안 돼요! 발을 어깨너비 1.5배로 벌려 단단히 지지하고, 두 손을 번쩍 들어 파울 없이 벽처럼 버티세요!",
        voiceScript: "골밑에서는 공격수와 골대 사이를 절대 양보하면 안 돼요! 무릎을 굽히고 두 팔을 하늘 높이 번쩍 들어 벽처럼 든든히 버티세요!"
      },
      {
        id: 7,
        title: "자유투 라인 정면 (하이 포스트, High Post)",
        shortName: "자유투 정면",
        situationDesc: "빨간색 공격수가 <strong>자유투 라인 한가운데</strong>에서 공을 잡고 슛과 패스를 노리고 있어요!",
        attacker: { x: 300, y: 270, angle: 0, label: "공격자 (자유투 라인)" },
        axisTarget: { x: 300, y: 270 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 205, angle: 180, label: "골밑 입구 방어", isCorrect: true, feedbackTitle: "완벽한 차단! 정답이에요!", feedbackDesc: "페인트존으로 들어오는 입구를 딱 지키고, 자유투 슛과 골밑 패스를 모두 방해할 수 있는 최적의 간격이에요!" },
          B: { x: 300, y: 245, angle: 180, label: "코앞 밀착", isCorrect: false, feedbackTitle: "스핀 무브에 당해요!", feedbackDesc: "자유투 라인에서 너무 붙으면 상대가 한 바퀴 휙 도는 기술(스핀 무브)이나 돌파에 쉽게 제쳐져요." },
          C: { x: 300, y: 120, angle: 180, label: "골밑까지 후퇴", isCorrect: false, feedbackTitle: "자유투 슛 허용!", feedbackDesc: "골밑까지 너무 물러서면 공격수가 편안하게 오픈 점프슛을 쏴서 점수를 줍니다." }
        },
        locationTipTitle: "하이 포스트에서의 발 모양 & 수비 요령",
        locationTipDesc: "자유투 라인은 슛과 안쪽 패스가 모두 일어나는 길목이에요. 두 발을 안정적으로 벌리고, 한 손은 슛을 막고 다른 손은 골밑 패스를 쳐내세요!",
        voiceScript: "자유투 라인은 슛과 패스가 모두 일어나는 중심지예요. 팔 하나 거리를 지키며 골밑으로 들어가는 패스를 손으로 차단하세요!"
      },
      {
        id: 8,
        title: "자유투 라인 모서리 (오른쪽 엘보우, Elbow)",
        shortName: "우측 엘보우",
        situationDesc: "빨간색 공격수가 <strong>자유투 라인 오른쪽 모서리(엘보우)</strong>에서 슛 폼을 잡고 있어요!",
        attacker: { x: 390, y: 265, angle: -35, label: "공격자 (엘보우)" },
        axisTarget: { x: 390, y: 265 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 450, y: 220, angle: 145, label: "바깥쪽으로 치우침", isCorrect: false, feedbackTitle: "골대 직행로가 뚫렸어요!", feedbackDesc: "수비수가 바깥쪽으로 치우쳐 있어서 공격수가 골대 정면으로 곧바로 드리블할 수 있어요." },
          B: { x: 365, y: 230, angle: 145, label: "너무 가까움", isCorrect: false, feedbackTitle: "파울 위험 증가!", feedbackDesc: "엘보우 지역에서 무리하게 붙으면 공격수의 슛 동작에 걸려 반칙(파울)을 부를 수 있어요." },
          C: { x: 345, y: 185, angle: 145, label: "대각선 차단선", isCorrect: true, feedbackTitle: "명품 수비! 정답이에요!", feedbackDesc: "골대 중심을 향하는 대각선 일직선 위에 발을 두고 서서 슛과 골밑 침투를 완벽히 막아냈어요!" }
        },
        locationTipTitle: "엘보우에서의 발 모양 & 수비 요령",
        locationTipDesc: "엘보우에서는 골대 쪽으로 비스듬히 파고드는 대각선 돌파가 가장 위협적이에요. 골대를 등지고 발끝이 공격수를 정확히 겨냥하도록 서세요!",
        voiceScript: "엘보우에서는 골대로 파고드는 대각선 돌파를 막는 것이 중요해요. 골대와 공격수를 잇는 일직선 상에 서서 중심을 낮추세요!"
      },
      {
        id: 9,
        title: "왼쪽 미들레인지 (Left Mid-Range)",
        shortName: "좌측 미들",
        situationDesc: "빨간색 공격수가 <strong>3점 라인 안쪽 미들 지역</strong>에서 점프슛을 노리고 있어요!",
        attacker: { x: 190, y: 290, angle: 35, label: "공격자 (미들레인지)" },
        axisTarget: { x: 190, y: 290 },
        otherPlayers: [],
        correctChoice: 'A',
        choices: {
          A: { x: 245, y: 210, angle: -145, label: "슛 & 돌파 견제", isCorrect: true, feedbackTitle: "백점 만점 수비! 정답이에요!", feedbackDesc: "골대와 일직선 상에서 팔 하나 간격을 완벽하게 유지하여 점프슛과 돌파를 모두 틀어막았어요!" },
          B: { x: 215, y: 255, angle: -145, label: "코앞 점프", isCorrect: false, feedbackTitle: "페이크에 날아올라요!", feedbackDesc: "너무 바짝 붙은 상태에서 상대 슛 페이크에 펄쩍 뛰면 그대로 옆으로 지나쳐 돌파당해요." },
          C: { x: 285, y: 150, angle: -145, label: "너무 뒤로 물러섬", isCorrect: false, feedbackTitle: "깨끗한 점퍼 허용!", feedbackDesc: "미들레인지는 슛 정확도가 아주 높아요! 이렇게 물러서면 편안한 2점슛을 그대로 내줘요." }
        },
        locationTipTitle: "미들레인지에서의 발 모양 & 스탠스",
        locationTipDesc: "미들레인지는 슛 성공률이 높아요. 발은 바닥에 단단히 붙인 채, 상대 슛 페이크에 뜨지 않고 하이핸드로 시야만 가려주세요!",
        voiceScript: "미들레인지에서는 상대 슛 속임수에 속아 펄쩍 뛰면 안 돼요! 발은 땅에 붙이고 한 손만 번쩍 뻗어 시야를 가려주세요!"
      },
      {
        id: 10,
        title: "속공 방어 / 센터라인 부근 (Fast Break)",
        shortName: "속공 수비",
        situationDesc: "빨간색 공격수가 <strong>하프라인을 넘어 빠른 스피드로 질주</strong>해 오고 있어요!",
        attacker: { x: 300, y: 640, angle: 0, label: "공격자 (속공 돌진)" },
        axisTarget: { x: 300, y: 640 },
        otherPlayers: [],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 600, angle: 180, label: "중앙선에서 덤비기", isCorrect: false, feedbackTitle: "앗! 순식간에 제쳐졌어요!", feedbackDesc: "달려오는 공격수에게 무리하게 앞으로 덤비면 휙 스피드로 뚫려 1초 만에 실점해요!" },
          B: { x: 190, y: 520, angle: 180, label: "옆으로 피하기", isCorrect: false, feedbackTitle: "중앙 고속도로가 뻥!", feedbackDesc: "중앙 길목을 비워두면 공격수가 골대까지 일직선으로 달려와 손쉬운 레이업을 넣어요." },
          C: { x: 300, y: 510, angle: 180, label: "백코트 지연 위치", isCorrect: true, feedbackTitle: "천재적인 속공 수비! 정답이에요!", feedbackDesc: "무리하게 덤비지 않고 골대 쪽으로 물러서면서(백코트) 상대 속도를 늦추고 우리 팀이 복귀할 시간을 벌었어요!" }
        },
        locationTipTitle: "속공 수비의 발놀림(Footwork) 비법",
        locationTipDesc: "달려오는 공격수를 향해 마주보고 서서 골대 방향으로 뒷걸음질(백페달)치며 상대 스피드를 줄이세요!",
        voiceScript: "속공 상황에서는 절대로 먼저 덤비지 마세요! 골대 쪽으로 물러나며 상대 속도를 늦추어 우리 편이 돌아올 시간을 벌어주는 것이 정답입니다!"
      }
    ],

    // ---------------- 2대2 팀워크 모드 (5문제) ----------------
    '2v2': [
      {
        id: 1,
        title: "2대2 패스 차단 (디나이 수비, Deny)",
        shortName: "디나이 수비",
        situationDesc: "정면(#7)이 우측 45도 공격수(#9)에게 패스하려 해요! 동료(#3)가 공을 막고 있어요. <strong>당신은 45도 공격수(#9)를 막는 수비수</strong>입니다!",
        attacker: { x: 300, y: 470, angle: 0, label: "공 가진 #7 (빨강)" },
        axisTarget: { x: 440, y: 410 },
        otherPlayers: [
          { type: 'att', x: 440, y: 410, angle: -30, number: '9', name: '공격수 9' },
          { type: 'def', x: 300, y: 380, angle: 180, number: '3', name: '동료 수비 3' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 480, y: 390, angle: 150, label: "공격수 뒤에 서기", isCorrect: false, feedbackTitle: "패스를 그냥 줘요!", feedbackDesc: "상대 등 뒤에 서 있으면 공격수가 편하게 패스를 받아 슛을 쏴요!" },
          B: { x: 400, y: 390, angle: 135, label: "패스 길목 차단 (디나이)", isCorrect: true, feedbackTitle: "완벽한 디나이 수비 성공!", feedbackDesc: "공과 내 마크맨 사이 길목에 서서 한 팔을 뻗어 패스를 사전 차단했어요!" },
          C: { x: 320, y: 300, angle: 180, label: "골밑으로 도망가기", isCorrect: false, feedbackTitle: "외곽이 텅 비었어요!", feedbackDesc: "마크맨을 완전히 놓쳐 오픈 3점슛을 맞게 돼요." }
        },
        locationTipTitle: "2대2 디나이(Deny) 수비 비법",
        locationTipDesc: "공이 없는 공격수를 막을 때는 '공'과 '내 마크맨'을 모두 시야에 두는 수비 삼각형을 만들고, 패스 길목에 손을 뻗어 쉽게 공을 받지 못하게 방해해야 해요!",
        voiceScript: "2대2 디나이 수비에서는 공과 내 마크맨을 모두 보면서 패스 길목에 손을 뻗어 공을 가로채거나 차단해야 합니다!"
      },
      {
        id: 2,
        title: "2대2 동료 돌파 허용 시 도움 수비 (Help)",
        shortName: "도움 수비(헬프)",
        situationDesc: "왼쪽 윙에서 동료(#3)가 돌파당했어요! 빨간색 공격수가 골밑으로 돌진 중입니다! <strong>골밑 근처에 있는 당신의 수비 위치는?</strong>",
        attacker: { x: 190, y: 320, angle: 30, label: "돌파 돌진 (#7 빨강)" },
        axisTarget: { x: 190, y: 320 },
        otherPlayers: [
          { type: 'att', x: 440, y: 380, angle: -30, number: '9', name: '외곽 공격수' },
          { type: 'def', x: 160, y: 360, angle: 30, number: '3', name: '제쳐진 동료' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 280, y: 180, angle: 140, label: "골밑 길목 도움 수비(Help)", isCorrect: true, feedbackTitle: "골밑을 구한 특급 헬프 수비!", feedbackDesc: "돌파해 들어오는 공격수의 앞길을 가로막아 쉬운 골밑 레이업을 막아냈어요!" },
          B: { x: 410, y: 340, angle: 150, label: "내 마크맨에게만 붙기", isCorrect: false, feedbackTitle: "골밑 레이업 실점!", feedbackDesc: "동료가 뚫렸을 때는 가장 위험한 골밑을 먼저 도와줘야 해요!" },
          C: { x: 300, y: 50, angle: 180, label: "골대 뒤로 물러서기", isCorrect: false, feedbackTitle: "공간을 너무 비워줬어요!", feedbackDesc: "골대 밑까지 너무 물러서면 쉬운 플로터나 뱅크슛을 허용해요." }
        },
        locationTipTitle: "헬프 디펜스(도움 수비)의 핵심",
        locationTipDesc: "팀 농구에서는 동료가 뚫렸을 때 1순위로 '우리 골밑'을 지켜야 해요! 내 마크맨을 1초간 살짝 비우더라도 먼저 골밑 레이업 길목을 가로막으세요!",
        voiceScript: "동료가 돌파당했을 때는 내 마크맨만 보지 말고, 즉시 골밑으로 발을 이동해 상대 레이업을 막아주는 도움 수비가 최고의 팀워크입니다!"
      },
      {
        id: 3,
        title: "2대2 스크린(Pick & Roll) 대처",
        shortName: "스크린 대처",
        situationDesc: "공격수 9번이 우리 동료(#3) 옆에 딱 붙어 길을 막는 스크린을 걸었어요! <strong>스크리너의 수비수인 당신은?</strong>",
        attacker: { x: 300, y: 460, angle: 0, label: "드리블러 (#7 빨강)" },
        axisTarget: { x: 300, y: 460 },
        otherPlayers: [
          { type: 'att', x: 340, y: 430, angle: 90, number: '9', name: '스크린 공격수' },
          { type: 'def', x: 300, y: 410, angle: 180, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 420, y: 390, angle: 180, label: "멀리 떨어져 구경하기", isCorrect: false, feedbackTitle: "골밑으로 바로 패스가 가요!", feedbackDesc: "스크리너가 골밑으로 돌진할 때 아무도 못 막게 돼요." },
          B: { x: 350, y: 480, angle: 0, label: "무리하게 스틸하러 뛰기", isCorrect: false, feedbackTitle: "파울 위험 & 뒷공간 오픈!", feedbackDesc: "무리하게 덤비면 2대1 아웃넘버 상황을 주게 됩니다." },
          C: { x: 350, y: 370, angle: 160, label: "길목 지연 & 동료 커버(드롭)", isCorrect: true, feedbackTitle: "스마트한 스크린 방어 성공!", feedbackDesc: "드리블러가 골밑으로 치고 들어오지 못하게 잠시 지연(헷지)하고 내 선수도 놓치지 않는 명당이에요!" }
        },
        locationTipTitle: "스크린 상황에서의 수비 콜(Call)",
        locationTipDesc: "스크린이 올 때는 큰 소리로 '오른쪽 스크린!'이라고 동료에게 알려주고, 무리하게 덤비지 않고 골밑 진입을 늦추어 동료가 복귀할 시간을 벌어주세요!",
        voiceScript: "스크린이 올 때는 큰 소리로 동료에게 알려주고, 골밑으로 침투하는 길목을 한 발 뒤에서 침착하게 막아내세요!"
      },
      {
        id: 4,
        title: "2대2 기브 앤 고(Give & Go) 컷인 차단",
        shortName: "컷인 차단",
        situationDesc: "공격수 7번이 9번에게 패스하자마자 골밑으로 쌩 달려 들어오고 있어요! <strong>7번 수비수인 당신의 위치는?</strong>",
        attacker: { x: 440, y: 380, angle: -30, label: "공 받은 #9 (빨강)" },
        axisTarget: { x: 300, y: 340 },
        otherPlayers: [
          { type: 'att', x: 300, y: 360, angle: 0, number: '7', name: '골밑 컷인 질주' },
          { type: 'def', x: 400, y: 340, angle: 150, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 280, angle: 180, label: "골밑 앞길 가로막기 (차단)", isCorrect: true, feedbackTitle: "나이스 컷인 차단!", feedbackDesc: "달려 들어오는 선수의 골밑 진로를 가슴으로 당당히 막아 완벽하게 패스를 차단했어요!" },
          B: { x: 230, y: 360, angle: 180, label: "옆으로 비켜주기", isCorrect: false, feedbackTitle: "원패스 골밑 레이업 허용!", feedbackDesc: "길을 비켜주면 공격수가 가볍게 골밑 슛을 넣어요." },
          C: { x: 420, y: 350, angle: 180, label: "공 쪽으로 우르르 몰려가기", isCorrect: false, feedbackTitle: "내 마크맨 컷인 방치!", feedbackDesc: "공만 쫓아가면 뒤에서 골밑으로 뛰어드는 선수를 완전히 놓쳐요." }
        },
        locationTipTitle: "기브 앤 고 수비 요령",
        locationTipDesc: "패스를 준 선수는 반드시 골밑으로 뛰어들어옵니다! 패스가 나가는 순간 내 마크맨의 앞을 몸으로 가로막아(범핑) 골밑으로 못 뛰게 만드세요!",
        voiceScript: "패스하고 골밑으로 뛰어드는 기브 앤 고는 공격수의 앞길을 몸으로 당당히 가로막아 차단해야 합니다!"
      },
      {
        id: 5,
        title: "2대2 패스 후 빠른 클로즈아웃(Closeout)",
        shortName: "클로즈아웃",
        situationDesc: "탑에서 오른쪽 윙 45도로 빠른 패스가 날아갔어요! <strong>윙 공격수(#9)를 막으러 달려가는 당신의 멈춤 위치는?</strong>",
        attacker: { x: 450, y: 400, angle: -30, label: "공 받은 #9 (빨강)" },
        axisTarget: { x: 450, y: 400 },
        otherPlayers: [
          { type: 'att', x: 300, y: 470, angle: 0, number: '7', name: '패스 준 7번' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '3', name: '동료 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 440, y: 410, angle: 150, label: "전속력으로 몸통 박치기", isCorrect: false, feedbackTitle: "파울 & 날아서 제쳐짐!", feedbackDesc: "너무 급하게 달려들면 슛 페이크 한 번에 휙 날아가 돌파당해요!" },
          B: { x: 380, y: 320, angle: 150, label: "팔 하나 거리에서 잔발 멈춤", isCorrect: true, feedbackTitle: "교과서적인 클로즈아웃!", feedbackDesc: "빠르게 다가가되 마지막에 잔발로 멈추며 한 손을 번쩍 들어 슛과 돌파를 모두 막았어요!" },
          C: { x: 330, y: 250, angle: 180, label: "골밑에서 멀뚱히 서기", isCorrect: false, feedbackTitle: "오픈 3점슛 헌납!", feedbackDesc: "거리가 너무 멀어 상대가 여유롭게 3점슛을 성공시켜요." }
        },
        locationTipTitle: "클로즈아웃(Closeout) 잔발 스텝",
        locationTipDesc: "외곽으로 패스가 갈 때는 전속력으로 달려가다가, 공격수 2미터 앞에서 '차차차' 잔발을 구르며 무게중심을 낮추고 한 손을 번쩍 들어야 해요!",
        voiceScript: "패스가 갈 때는 전속력으로 달려가다 마지막에 잔발로 멈추며 한 손을 번쩍 드는 클로즈아웃이 필수입니다!"
      }
    ],

    // ---------------- 3대3 반코트 모드 (5문제) ----------------
    '3v3': [
      {
        id: 1,
        title: "3대3 수비 삼각형 (Defense Triangle)",
        shortName: "수비 삼각형",
        situationDesc: "탑(#7)에 공이 있고 동료가 막고 있어요. 당신은 <strong>반대편 왼쪽 윙 공격수(#9)</strong>를 맡고 있습니다. 올바른 위치는?",
        attacker: { x: 300, y: 470, angle: 0, label: "탑 공 소유 (#7)" },
        axisTarget: { x: 150, y: 400 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '8', name: '우측 윙' },
          { type: 'att', x: 150, y: 400, angle: 30, number: '9', name: '내 마크맨' },
          { type: 'def', x: 300, y: 390, angle: 180, number: '1', name: '동료 수비 1' },
          { type: 'def', x: 390, y: 340, angle: 150, number: '2', name: '동료 수비 2' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 220, y: 330, angle: 140, label: "공과 마크맨 동시 시야 (삼각형)", isCorrect: true, feedbackTitle: "완벽한 수비 삼각형!", feedbackDesc: "공의 움직임과 내 마크맨을 동시에 보면서 골밑 헬프까지 준비하는 명당이에요!" },
          B: { x: 140, y: 420, angle: -150, label: "내 마크맨에게만 꼭 붙기", isCorrect: false, feedbackTitle: "공이 전혀 안 보여요!", feedbackDesc: "마크맨만 보고 있으면 공이 어디로 가는지, 동료가 뚫렸는지 전혀 알 수 없어요." },
          C: { x: 300, y: 150, angle: 180, label: "골대 밑에 혼자 서기", isCorrect: false, feedbackTitle: "내 선수가 완전 오픈!", feedbackDesc: "너무 멀리 떨어지면 내 마크맨에게 패스가 갔을 때 막을 수 없어요." }
        },
        locationTipTitle: "수비 삼각형(Defense Triangle)의 법칙",
        locationTipDesc: "공이 내 마크맨에게 없을 때는 한 손은 '공', 다른 한 손은 '내 마크맨'을 가리키는 삼각형의 꼭짓점에 서서 양쪽을 다 봐야 해요!",
        voiceScript: "3대3에서는 공과 내 마크맨을 모두 시야에 두는 수비 삼각형 위치를 지키는 것이 가장 중요합니다!"
      },
      {
        id: 2,
        title: "3대3 위크사이드 페인트존 보호",
        shortName: "위크사이드 보호",
        situationDesc: "공이 오른쪽 코너(#8)로 들어갔어요! 반대편 왼쪽 외곽을 맡은 <strong>당신(위크사이드 수비수)의 최선의 위치는?</strong>",
        attacker: { x: 530, y: 180, angle: -80, label: "코너 공 소유 (#8)" },
        axisTarget: { x: 140, y: 360 },
        otherPlayers: [
          { type: 'att', x: 300, y: 450, angle: 0, number: '7', name: '탑 공격수' },
          { type: 'att', x: 140, y: 360, angle: 30, number: '9', name: '반대편 마크맨' },
          { type: 'def', x: 460, y: 160, angle: 100, number: '1', name: '코너 수비' },
          { type: 'def', x: 300, y: 370, angle: 180, number: '2', name: '탑 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 130, y: 380, angle: -150, label: "외곽 마크맨에게 붙어있기", isCorrect: false, feedbackTitle: "골밑이 텅 비었어요!", feedbackDesc: "공이 반대편에 있을 때는 골밑을 커버해 줘야 팀이 실점하지 않아요." },
          B: { x: 480, y: 220, angle: 120, label: "코너로 우르르 달려가기", isCorrect: false, feedbackTitle: "반대편 전체가 노마크!", feedbackDesc: "코너는 이미 동료가 막고 있어요. 반대편 패스 한 방에 3점을 줘요." },
          C: { x: 260, y: 210, angle: 130, label: "페인트존 중앙으로 좁혀서 보호", isCorrect: true, feedbackTitle: "최고의 페인트존 수호자!", feedbackDesc: "공 반대편에서 중앙 페인트존까지 좁혀들어와 상대 골밑 침투를 완벽히 막았어요!" }
        },
        locationTipTitle: "위크사이드(Weak Side) 수비 위치",
        locationTipDesc: "공이 반대편(스트롱사이드)에 있을 때는 과감하게 페인트존 쪽으로 좁혀들어와 골밑을 철통 방어하세요!",
        voiceScript: "공이 반대편에 있을 때는 페인트존 중앙까지 좁혀서 골밑을 보호하는 위크사이드 수비를 펼치세요!"
      },
      {
        id: 3,
        title: "3대3 백도어 컷(Backdoor) 차단",
        shortName: "백도어 차단",
        situationDesc: "왼쪽 윙의 공격수(#9)가 공을 받으러 나오는 척하다가 갑자기 골밑 뒤쪽으로 꺾어 파고듭니다! <strong>어디로 반응해야 할까요?</strong>",
        attacker: { x: 300, y: 470, angle: 0, label: "패스 주려는 #7" },
        axisTarget: { x: 180, y: 260 },
        otherPlayers: [
          { type: 'att', x: 440, y: 400, angle: -30, number: '8', name: '우측 윙' },
          { type: 'att', x: 180, y: 280, angle: 10, number: '9', name: '백도어 침투 중' },
          { type: 'def', x: 300, y: 390, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 390, y: 340, angle: 150, number: '2', name: '우측 수비' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 130, y: 380, angle: 180, label: "외곽 3점 라인에 멍하니 서기", isCorrect: false, feedbackTitle: "골밑 백도어 레이업 허용!", feedbackDesc: "외곽에 서 있으면 뒤로 파고든 공격수가 쉬운 레이업을 넣어요." },
          B: { x: 210, y: 200, angle: 150, label: "골대 쪽으로 몸 돌려 길목 선점", isCorrect: true, feedbackTitle: "환상적인 백도어 차단!", feedbackDesc: "속임수에 속지 않고 골대 방향으로 먼저 발을 딛어 골밑 패스를 막아냈어요!" },
          C: { x: 270, y: 420, angle: 0, label: "탑 공 쪽으로 손 뻗기", isCorrect: false, feedbackTitle: "뒤통수를 완전히 털렸어요!", feedbackDesc: "달려드는 공격수의 진로를 먼저 몸으로 막아야 해요." }
        },
        locationTipTitle: "백도어 컷 수비의 핵심 스텝",
        locationTipDesc: "공격수가 내 등 뒤로 파고들 때는 머리를 돌려 시선을 유지하고, 골대 쪽으로 헤드 턴(Head Turn)하여 골밑 길목을 먼저 장악하세요!",
        voiceScript: "백도어 컷이 들어올 때는 골대 방향으로 빠르게 몸을 돌려 골밑 길목을 먼저 장악해야 합니다!"
      },
      {
        id: 4,
        title: "3대3 스위치(Switch) 수비",
        shortName: "스위치 수비",
        situationDesc: "공격수 7번과 9번이 서로 교차하며 엇갈려 달렸어요! <strong>동료가 '스위치!'를 외쳤을 때 당신의 행동은?</strong>",
        attacker: { x: 360, y: 380, angle: -20, label: "돌파해 오는 #7" },
        axisTarget: { x: 360, y: 380 },
        otherPlayers: [
          { type: 'att', x: 220, y: 400, angle: 40, number: '9', name: '외곽 빠지는 9' },
          { type: 'att', x: 480, y: 350, angle: -50, number: '8', name: '우측 코너' },
          { type: 'def', x: 260, y: 380, angle: -150, number: '1', name: '스위치 외친 동료' },
          { type: 'def', x: 440, y: 300, angle: 140, number: '2', name: '코너 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 330, y: 310, angle: 160, label: "돌파해 오는 7번을 바로 이어받아 수비", isCorrect: true, feedbackTitle: "완벽한 스위치 디펜스!", feedbackDesc: "동료의 콜에 맞춰 골밑으로 오는 더 위험한 공격수를 즉시 이어받아 막았어요!" },
          B: { x: 190, y: 380, angle: 180, label: "원래 내 마크맨(9번) 쫓아가기", isCorrect: false, feedbackTitle: "동료와 엉켜서 둘 다 뚫림!", feedbackDesc: "스위치 콜이 나왔을 때는 서로 사람을 바꿔서 막아야 해요." },
          C: { x: 300, y: 100, angle: 180, label: "누가 막을지 몰라 멈칫하기", isCorrect: false, feedbackTitle: "노마크 슛 허용!", feedbackDesc: "망설이는 1초 사이에 상대가 슛을 던져요." }
        },
        locationTipTitle: "스위치(Switch) 디펜스 소통법",
        locationTipDesc: "두 공격수가 엇갈릴 때는 서로 사람을 바꾸는 '스위치!'를 큰 소리로 외치고, 골밑으로 침투하는 선수를 지체 없이 이어받으세요!",
        voiceScript: "스위치 상황에서는 큰 소리로 외치며 골밑으로 오는 더 위험한 공격수를 즉시 이어받아 수비하세요!"
      },
      {
        id: 5,
        title: "3대3 슛 후 박스아웃(Box-out)",
        shortName: "박스아웃",
        situationDesc: "탑에서 3점슛이 올라갔어요! 공이 림을 향해 날아가는 순간, <strong>골밑 근처에 있는 당신의 최선의 행동은?</strong>",
        attacker: { x: 300, y: 480, angle: 0, label: "슛 던진 #7 (빨강)" },
        axisTarget: { x: 280, y: 160 },
        otherPlayers: [
          { type: 'att', x: 260, y: 220, angle: 0, number: '9', name: '리바운드 침투 중' },
          { type: 'att', x: 440, y: 360, angle: -30, number: '8', name: '외곽 공격수' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 수비' },
          { type: 'def', x: 400, y: 300, angle: 140, number: '2', name: '외곽 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 100, angle: 0, label: "공만 쳐다보고 높이 점프하기", isCorrect: false, feedbackTitle: "뒤에서 공격수가 팁인 득점!", feedbackDesc: "공만 보고 뛰면 뒤에서 달려드는 공격수에게 리바운드를 빼앗겨요." },
          B: { x: 200, y: 280, angle: 180, label: "속공 나가려고 미리 뛰기", isCorrect: false, feedbackTitle: "공을 아직 못 잡았어요!", feedbackDesc: "리바운드를 완전히 잡기 전에 먼저 뛰어나가면 안 돼요." },
          C: { x: 270, y: 170, angle: 170, label: "내 마크맨을 등으로 막고(박스아웃) 공간 확보", isCorrect: true, feedbackTitle: "리바운드의 제왕! 박스아웃 성공!", feedbackDesc: "엉덩이를 낮추고 상대를 등으로 밀어내며 골밑 공을 안전하게 확보했어요!" }
        },
        locationTipTitle: "박스아웃(Box-Out) 3단계",
        locationTipDesc: "1. 슛이 뜨면 상대를 먼저 찾는다! 2. 몸과 엉덩이로 상대를 가로막는다! 3. 공이 튀어나올 때 두 손으로 꽉 잡는다!",
        voiceScript: "슛이 올라갔을 때는 공만 보지 말고, 몸으로 상대를 먼저 가로막는 박스아웃을 한 뒤 리바운드를 잡으세요!"
      }
    ],

    // ---------------- 5대5 정규전 모드 (5문제) ----------------
    '5v5': [
      {
        id: 1,
        title: "5대5 맨투맨 I-Line (아이 라인) 커버",
        shortName: "I-Line 커버",
        situationDesc: "공이 오른쪽 윙에 있어요! 당신은 <strong>반대편 왼쪽 코너 공격수(#11)</strong>를 맡은 수비수입니다. 올바른 위치는?",
        attacker: { x: 480, y: 360, angle: -40, label: "윙 공 소유 (#7)" },
        axisTarget: { x: 300, y: 220 },
        otherPlayers: [
          { type: 'att', x: 300, y: 470, angle: 0, number: '1', name: '포인트가드' },
          { type: 'att', x: 520, y: 160, angle: -80, number: '9', name: '우측 코너' },
          { type: 'att', x: 380, y: 180, angle: -40, number: '10', name: '우측 센터' },
          { type: 'att', x: 80, y: 160, angle: 80, number: '11', name: '내 마크맨' },
          { type: 'def', x: 420, y: 300, angle: 140, number: '2', name: '윙 수비' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '3', name: '가드 수비' },
          { type: 'def', x: 460, y: 140, angle: 100, number: '4', name: '코너 수비' },
          { type: 'def', x: 350, y: 140, angle: 140, number: '5', name: '센터 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 260, y: 180, angle: 120, label: "중앙선(I-Line)까지 좁혀 페인트존 수호", isCorrect: true, feedbackTitle: "정규전 수비의 정석! I-Line 완벽!", feedbackDesc: "가상의 중앙선(I-Line)까지 들어와 림 프로텍션을 서포트하고 반대편 롱패스도 대비했어요!" },
          B: { x: 90, y: 160, angle: -100, label: "반대편 코너에 꼭 붙어있기", isCorrect: false, feedbackTitle: "골밑 수비 지원 부족!", feedbackDesc: "5대5에서는 공 반대편 수비수가 중앙까지 좁혀줘야 골밑이 뚫리지 않아요." },
          C: { x: 440, y: 340, angle: 180, label: "오른쪽 공 쪽으로 다 몰려가기", isCorrect: false, feedbackTitle: "반대편 전체가 무방비!", feedbackDesc: "한쪽으로 다 쏠리면 스킵 패스 한 번에 완전 노마크가 돼요." }
        },
        locationTipTitle: "5대5 I-Line (아이 라인) 수비",
        locationTipDesc: "골대와 백보드를 잇는 코트 중앙 일직선을 I-Line이라고 해요. 공 반대편 수비수들은 이 라인까지 들어와 벽을 만들어야 합니다!",
        voiceScript: "5대5 정규 경기에서는 공 반대편 수비수가 코트 중앙 가상의 아이 라인까지 좁혀 페인트존을 지켜야 합니다!"
      },
      {
        id: 2,
        title: "5대5 2-3 지역방어 앞선 가드 위치",
        shortName: "2-3 앞선 수비",
        situationDesc: "우리 팀이 2-3 지역방어(Zone)를 펼칩니다! <strong>앞선 왼쪽 가드인 당신의 기본 위치는?</strong>",
        attacker: { x: 300, y: 470, angle: 0, label: "상대 리딩 가드 (#1)" },
        axisTarget: { x: 240, y: 380 },
        otherPlayers: [
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 360, y: 220, angle: 0, number: '10', name: '센터' },
          { type: 'att', x: 500, y: 150, angle: -80, number: '11', name: '우측 코너' },
          { type: 'def', x: 350, y: 380, angle: 180, number: '2', name: '앞선 오른쪽 가드' },
          { type: 'def', x: 180, y: 220, angle: 150, number: '3', name: '뒷선 왼쪽 포워드' },
          { type: 'def', x: 300, y: 160, angle: 180, number: '5', name: '뒷선 중앙 센터' },
          { type: 'def', x: 420, y: 220, angle: -150, number: '4', name: '뒷선 오른쪽 포워드' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 300, y: 460, angle: 180, label: "혼자 무리하게 스틸하러 돌진", isCorrect: false, feedbackTitle: "지역방어 대열 붕괴!", feedbackDesc: "앞선 가드가 혼자 뛰어나가면 중앙 하이포스트가 뻥 뚫려요." },
          B: { x: 250, y: 370, angle: 170, label: "3점 라인 앞선에서 좌측 윙 견제", isCorrect: true, feedbackTitle: "완벽한 2-3 존 앞선 위치!", feedbackDesc: "동료 가드와 나란히 서서 중앙 침투를 막고 왼쪽 패스를 압박하는 정석 위치예요!" },
          C: { x: 200, y: 120, angle: 180, label: "골밑까지 내려가 버티기", isCorrect: false, feedbackTitle: "앞선 외곽 3점슛 대폭발!", feedbackDesc: "가드가 골밑까지 처지면 외곽에서 편하게 3점슛을 퍼부어요." }
        },
        locationTipTitle: "2-3 지역방어 앞선의 역할",
        locationTipDesc: "2-3 존의 앞선 가드 2명은 하이포스트로 들어가는 패스를 막고, 공이 윙으로 갈 때 빠르게 달려나가 3점슛을 체크해야 해요!",
        voiceScript: "2-3 지역방어에서 앞선 가드는 중앙 하이포스트 패스를 차단하고 외곽을 견제하는 역할을 맡습니다!"
      },
      {
        id: 3,
        title: "5대5 2-3 지역방어 코너 슛 커버 (뒷선 윙)",
        shortName: "코너 로테이션",
        situationDesc: "상대가 왼쪽 코너(#9)로 빠른 패스를 보냈어요! <strong>2-3 존의 뒷선 왼쪽 수비수인 당신은?</strong>",
        attacker: { x: 80, y: 160, angle: 80, label: "코너 공 소유 (#9)" },
        axisTarget: { x: 140, y: 150 },
        otherPlayers: [
          { type: 'att', x: 150, y: 380, angle: 30, number: '7', name: '좌측 윙' },
          { type: 'att', x: 300, y: 460, angle: 0, number: '1', name: '가드' },
          { type: 'att', x: 320, y: 180, angle: 0, number: '10', name: '센터' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '11', name: '우측 윙' },
          { type: 'def', x: 220, y: 360, angle: 160, number: '2', name: '앞선 가드 1' },
          { type: 'def', x: 340, y: 360, angle: 180, number: '3', name: '앞선 가드 2' },
          { type: 'def', x: 260, y: 160, angle: 150, number: '5', name: '센터' },
          { type: 'def', x: 400, y: 220, angle: -150, number: '4', name: '뒷선 우측' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 200, y: 220, angle: 180, label: "가만히 서서 지켜보기", isCorrect: false, feedbackTitle: "노마크 코너 3점슛 실점!", feedbackDesc: "코너는 가장 가까운 뒷선 윙 수비수가 총알같이 튀어나가야 해요." },
          B: { x: 70, y: 150, angle: -100, label: "선 밖으로 날아가 몸통 박치기", isCorrect: false, feedbackTitle: "파울 & 베이스라인 오픈!", feedbackDesc: "너무 급하게 달려들면 펌프 페이크에 속아 쉽게 뚫려요." },
          C: { x: 140, y: 140, angle: -100, label: "코너로 튀어나가 베이스라인 차단", isCorrect: true, feedbackTitle: "환상적인 2-3 존 코너 커버!", feedbackDesc: "재빠르게 코너로 달려나가 3점슛을 체크하고 골밑 베이스라인 돌파를 봉쇄했어요!" }
        },
        locationTipTitle: "2-3 존의 코너 로테이션",
        locationTipDesc: "코너로 공이 가면 뒷선 윙이 재빠르게 뛰어나가고, 중앙 센터가 골밑을 채워주는 유기적인 로테이션이 핵심이에요!",
        voiceScript: "코너로 공이 갔을 때는 뒷선 윙 수비수가 빠르게 달려나가 슛과 베이스라인 돌파를 모두 차단해야 합니다!"
      },
      {
        id: 4,
        title: "5대5 하이-로우 패스 차단 (포스트 프런트 수비)",
        shortName: "포스트 프런트",
        situationDesc: "자유투 라인(#1)에서 골밑 장신 센터(#10)에게 패스하려 해요! <strong>센터를 막는 당신의 수비 위치는?</strong>",
        attacker: { x: 300, y: 280, angle: 0, label: "자유투 공 소유 (#1)" },
        axisTarget: { x: 300, y: 180 },
        otherPlayers: [
          { type: 'att', x: 300, y: 170, angle: 0, number: '10', name: '골밑 장신 센터' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '외곽 7' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '외곽 9' },
          { type: 'att', x: 500, y: 160, angle: -80, number: '11', name: '코너 11' },
          { type: 'def', x: 300, y: 330, angle: 180, number: '2', name: '자유투 수비' },
          { type: 'def', x: 400, y: 300, angle: 150, number: '3', name: '외곽 수비' },
          { type: 'def', x: 200, y: 300, angle: -150, number: '4', name: '외곽 수비' },
          { type: 'def', x: 440, y: 150, angle: 100, number: '5', name: '코너 수비' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 300, y: 210, angle: 180, label: "공격수 앞(프런트)을 가로막아 패스 차단", isCorrect: true, feedbackTitle: "환상적인 프런트 디펜스(Front)!", feedbackDesc: "센터의 앞길을 몸과 팔로 완전히 가로막아 골밑 패스 자체를 원천 봉쇄했어요!" },
          B: { x: 300, y: 120, angle: 180, label: "공격수 등 뒤에 숨어있기", isCorrect: false, feedbackTitle: "쉬운 골밑 패스 & 덩크 허용!", feedbackDesc: "키 큰 센터의 등 뒤에 서 있으면 머리 위로 넘어오는 패스를 절대 못 막아요." },
          C: { x: 220, y: 180, angle: 140, label: "옆으로 멀리 비켜서기", isCorrect: false, feedbackTitle: "골대 중앙이 텅 비었어요!", feedbackDesc: "센터에게 가장 넓은 골밑 공간을 공짜로 내주게 돼요." }
        },
        locationTipTitle: "골밑 프런트 디펜스(Fronting)",
        locationTipDesc: "골밑 공격수가 나보다 키가 크다면 등 뒤에서 버티지 말고, 아예 공격수의 앞을 가로막아 패스가 못 들어오게 만드는 것이 최고 비법이에요!",
        voiceScript: "키 큰 센터를 막을 때는 등 뒤에 서지 말고 공격수 앞을 가로막아 패스 자체를 차단하는 프런트 수비가 정답입니다!"
      },
      {
        id: 5,
        title: "5대5 속공 2대1 수적 열세 수비 (Tandem)",
        shortName: "2대1 속공 수비",
        situationDesc: "상대 공격수 2명이 폭풍처럼 달려오고, <strong>수비수는 오직 당신 혼자 골밑에 남았습니다! 당신의 위치는?</strong>",
        attacker: { x: 240, y: 460, angle: 0, label: "드리블 질주 (#7)" },
        axisTarget: { x: 300, y: 200 },
        otherPlayers: [
          { type: 'att', x: 380, y: 440, angle: 0, number: '9', name: '패스 대기 질주' },
          { type: 'att', x: 200, y: 640, angle: 0, number: '1', name: '뒤따라오는 공격' },
          { type: 'att', x: 420, y: 640, angle: 0, number: '10', name: '뒤따라오는 공격' },
          { type: 'att', x: 500, y: 600, angle: 0, number: '11', name: '뒤따라오는 공격' },
          { type: 'def', x: 220, y: 580, angle: 0, number: '2', name: '헐레벌떡 백코트' },
          { type: 'def', x: 350, y: 590, angle: 0, number: '3', name: '헐레벌떡 백코트' },
          { type: 'def', x: 180, y: 660, angle: 0, number: '4', name: '백코트 중' },
          { type: 'def', x: 420, y: 660, angle: 0, number: '5', name: '백코트 중' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 240, y: 440, angle: 180, label: "공 가진 7번에게 성급히 달려들기", isCorrect: false, feedbackTitle: "옆으로 툭 패스해서 노마크 득점!", feedbackDesc: "무리하게 덤비면 옆으로 툭 패스해서 100% 손쉬운 득점을 내줘요." },
          B: { x: 300, y: 220, angle: 180, label: "페인트존 중앙에서 시간을 벌며 페이크", isCorrect: true, feedbackTitle: "영웅적인 2대1 수비 성공!", feedbackDesc: "골밑 중앙을 지키며 슛과 패스 모두를 망설이게 만들어, 우리 팀 동료들이 돌아올 귀중한 3초를 벌었어요!" },
          C: { x: 150, y: 200, angle: 180, label: "사이드라인으로 도망가기", isCorrect: false, feedbackTitle: "골대 중앙 고속도로 개통!", feedbackDesc: "가장 소중한 골대 중앙을 비우면 안 돼요." }
        },
        locationTipTitle: "수적 열세(2대1) 속공 수비 비법",
        locationTipDesc: "절대 먼저 달려들지 마세요! 페인트존 중앙에서 뒷걸음질 치며 슛인 척하면 블록 준비, 패스하면 바로 가로채겠다는 페이크로 시간을 버세요!",
        voiceScript: "혼자서 2명을 막아야 할 때는 덤비지 말고 골밑 중앙에서 상대가 슛할지 패스할지 망설이게 시간을 버는 것이 정답입니다!"
      },
      {
        id: 6,
        title: "5대5 픽앤롤(Pick & Roll) 스위치 디펜스",
        shortName: "스크린 스위치",
        situationDesc: "상대 드리블러가 스크린을 타고 우측으로 돌파하려 해요! 동료 가드가 스크린에 걸렸습니다. <strong>스크리너를 막고 있던 당신의 스위치(Switch) 위치는?</strong>",
        attacker: { x: 300, y: 460, angle: 0, label: "공 가진 상대 가드" },
        axisTarget: { x: 370, y: 390 },
        otherPlayers: [
          { type: 'att', x: 340, y: 440, angle: -90, number: '10', name: '스크린 빅맨' },
          { type: 'att', x: 470, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 500, y: 150, angle: -80, number: '11', name: '우측 코너' },
          { type: 'def', x: 310, y: 450, angle: 180, number: '2', name: '스크린 걸린 동료' },
          { type: 'def', x: 420, y: 340, angle: 150, number: '3', name: '우측 윙 수비' },
          { type: 'def', x: 200, y: 320, angle: -150, number: '4', name: '좌측 윙 수비' },
          { type: 'def', x: 300, y: 170, angle: 180, number: '5', name: '골밑 센터' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 220, angle: 180, label: "골밑으로 뒷걸음질 치기", isCorrect: false, feedbackTitle: "노마크 점퍼 허용!", feedbackDesc: "가드가 스크린을 빠져나와 여유롭게 미들슛을 쏴버려요." },
          B: { x: 350, y: 460, angle: 0, label: "내 원래 마크맨 뒤에만 서있기", isCorrect: false, feedbackTitle: "드리블러 골밑 고속도로 돌파!", feedbackDesc: "동료가 걸렸을 때는 스위치해서 드리블러 앞을 먼저 차단해야 해요." },
          C: { x: 360, y: 390, angle: 150, label: "지체 없이 스위치하여 돌파 길목 차단", isCorrect: true, feedbackTitle: "완벽한 스위치 디펜스 성공!", feedbackDesc: "스위치 콜과 함께 드리블러의 돌파 진로 앞을 가슴으로 당당히 가로막았어요!" }
        },
        locationTipTitle: "픽앤롤 스위치(Switch) 요령",
        locationTipDesc: "스크린에 동료가 걸렸을 때는 큰 소리로 '스위치!'를 외치고, 스크리너 수비수가 지체 없이 드리블러의 앞길(팔 하나 거리)을 몸으로 막아야 해요!",
        voiceScript: "스크린에 걸렸을 때는 즉시 스위치를 외치며 드리블러의 앞길을 몸으로 막아서는 스위치 수비가 정답입니다!"
      },
      {
        id: 7,
        title: "5대5 트랜지션 백코트 & 림 프로텍션 (Safety)",
        shortName: "트랜지션 백코트",
        situationDesc: "우리 슛이 빗나가고 상대가 리바운드를 잡아 롱패스를 노려요! 상대 선봉이 골밑으로 질주 중입니다. <strong>가장 먼저 백코트하는 안전망(Safety)인 당신의 위치는?</strong>",
        attacker: { x: 260, y: 560, angle: 0, label: "리바운드 가드" },
        axisTarget: { x: 300, y: 170 },
        otherPlayers: [
          { type: 'att', x: 350, y: 310, angle: 0, number: '7', name: '속공 질주 선봉' },
          { type: 'att', x: 470, y: 440, angle: 0, number: '9', name: '우측 윙 질주' },
          { type: 'att', x: 150, y: 580, angle: 0, number: '1', name: '뒤따르는 공격' },
          { type: 'att', x: 380, y: 620, angle: 0, number: '10', name: '공격 빅맨' },
          { type: 'def', x: 230, y: 460, angle: 0, number: '2', name: '백코트 중인 동료' },
          { type: 'def', x: 160, y: 580, angle: 0, number: '3', name: '백코트 중인 동료' },
          { type: 'def', x: 330, y: 620, angle: 0, number: '4', name: '리바운드 후 복귀' },
          { type: 'def', x: 440, y: 580, angle: 0, number: '5', name: '리바운드 후 복귀' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 260, y: 500, angle: 180, label: "하프라인에서 공 뺏으러 덤비기", isCorrect: false, feedbackTitle: "롱패스 한 방에 원샷 레이업 허용!", feedbackDesc: "무리하게 덤비면 머리 위로 롱패스가 넘어가 쉬운 실점을 해요." },
          B: { x: 300, y: 180, angle: 180, label: "골대 밑으로 먼저 뛰어가 상대 선봉 앞길 차단", isCorrect: true, feedbackTitle: "골밑을 구한 명품 백코트!", feedbackDesc: "공보다 먼저 우리 골대 밑(페인트존)을 지켜 상대 속공 득점을 완벽하게 무산시켰어요!" },
          C: { x: 460, y: 300, angle: 180, label: "외곽 사이드라인으로 피하기", isCorrect: false, feedbackTitle: "중앙 림 진로가 텅 비었어요!", feedbackDesc: "트랜지션 수비의 제1원칙은 사이드가 아니라 '골대 앞 페인트존 사수'예요." }
        },
        locationTipTitle: "트랜지션 수비 제1원칙: 골대 먼저 수호!",
        locationTipDesc: "백코트할 때는 절대 공을 쫓아가지 말고, 상대 질주자보다 먼저 '우리 골대 밑'으로 달려가 림 앞 벽을 세워야 합니다!",
        voiceScript: "역습을 당할 때는 공을 쫓지 말고 우리 골대 밑으로 먼저 전속력 백코트하여 골밑 길목을 지키세요!"
      },
      {
        id: 8,
        title: "5대5 헬프 앤드 리커버 (도움 수비 후 제자리 복귀)",
        shortName: "헬프 & 리커버",
        situationDesc: "우측 윙에서 동료가 살짝 제쳐져 당신이 골밑을 1초간 막아섰어요! <strong>상대가 코너로 킥아웃 패스를 빼는 순간 당신의 복귀 위치는?</strong>",
        attacker: { x: 430, y: 380, angle: -30, label: "킥아웃 패서" },
        axisTarget: { x: 470, y: 190 },
        otherPlayers: [
          { type: 'att', x: 490, y: 160, angle: -80, number: '11', name: '오픈 코너 슈터' },
          { type: 'att', x: 300, y: 470, angle: 0, number: '1', name: '탑 가드' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'att', x: 200, y: 220, angle: 80, number: '10', name: '골밑 센터' },
          { type: 'def', x: 410, y: 360, angle: 150, number: '2', name: '따라붙는 동료' },
          { type: 'def', x: 300, y: 390, angle: 180, number: '3', name: '탑 수비' },
          { type: 'def', x: 220, y: 320, angle: -150, number: '4', name: '반대편 수비' },
          { type: 'def', x: 280, y: 190, angle: 180, number: '5', name: '골밑 수호 센터' }
        ],
        correctChoice: 'A',
        choices: {
          A: { x: 440, y: 180, angle: 100, label: "내 마크맨인 코너 슈터에게 잔발로 전력 복귀", isCorrect: true, feedbackTitle: "교과서적인 헬프 & 리커버!", feedbackDesc: "골밑 돌파를 멈추게 한 뒤, 즉시 외곽 코너 슈터에게 달려나가 3점슛까지 차단했어요!" },
          B: { x: 410, y: 360, angle: 150, label: "공 던진 사람에게 계속 붙어있기", isCorrect: false, feedbackTitle: "코너 노마크 3점슛 실점!", feedbackDesc: "패스가 나갔는데도 매달려 있으면 내 마크맨이 완벽한 오픈 찬스를 맞아요." },
          C: { x: 300, y: 120, angle: 180, label: "골대 뒤로 도망치기", isCorrect: false, feedbackTitle: "슈터 방해 실패!", feedbackDesc: "외곽 슈터를 향해 손을 뻗으며 전속력으로 튀어나가야 해요." }
        },
        locationTipTitle: "헬프 & 리커버(Help & Recover) 타이밍",
        locationTipDesc: "도움 수비는 길어야 1초! 상대 돌파가 멈추고 공이 나가는 순간, 지체 없이 내 마크맨을 향해 전력 질주하며 한 손을 번쩍 들어야 해요!",
        voiceScript: "도움 수비로 돌파를 멈춘 뒤에는 1초도 지체하지 말고 외곽의 내 마크맨에게 전력 질주해 슛을 막아내세요!"
      },
      {
        id: 9,
        title: "5대5 슛 직후 박스아웃 & 수비 리바운드",
        shortName: "박스아웃 리바운드",
        situationDesc: "상대 가드가 3점슛을 던져 공이 골대로 날아가요! 바로 뒤에 상대 장신 선수가 쇄도 중입니다. <strong>리바운드를 사수할 당신의 첫 발자국 위치는?</strong>",
        attacker: { x: 300, y: 470, angle: 0, label: "3점슛 시도 가드" },
        axisTarget: { x: 370, y: 220 },
        otherPlayers: [
          { type: 'att', x: 380, y: 240, angle: 0, number: '10', name: '골밑 쇄도 공격수' },
          { type: 'att', x: 220, y: 220, angle: 0, number: '11', name: '골밑 쇄도 센터' },
          { type: 'att', x: 460, y: 380, angle: -30, number: '7', name: '우측 윙' },
          { type: 'att', x: 140, y: 380, angle: 30, number: '9', name: '좌측 윙' },
          { type: 'def', x: 300, y: 400, angle: 180, number: '1', name: '탑 가드' },
          { type: 'def', x: 230, y: 170, angle: 180, number: '5', name: '반대편 박스아웃' },
          { type: 'def', x: 400, y: 330, angle: 150, number: '3', name: '우측 윙 수비' },
          { type: 'def', x: 200, y: 330, angle: -150, number: '4', name: '좌측 윙 수비' }
        ],
        correctChoice: 'C',
        choices: {
          A: { x: 300, y: 100, angle: 0, label: "골대 바로 밑으로 들어가 림만 쳐다보기", isCorrect: false, feedbackTitle: "뒤에서 덮쳐 풋백 덩크 허용!", feedbackDesc: "공만 쳐다보면 뒤에서 뛰어드는 공격수를 전혀 제어할 수 없어요." },
          B: { x: 440, y: 240, angle: 180, label: "몸싸움 피해서 옆으로 빠지기", isCorrect: false, feedbackTitle: "공격 리바운드 헌납!", feedbackDesc: "골밑 앞길을 비워주면 상대가 편안하게 세컨 찬스 득점을 올려요." },
          C: { x: 370, y: 200, angle: 0, label: "상대 공격수를 등지고 엉덩이로 밀어내며 박스아웃", isCorrect: true, feedbackTitle: "철벽 박스아웃 & 리바운드 완승!", feedbackDesc: "공 대신 상대를 먼저 몸으로 가두어 골대 접근을 완전히 차단하고 완벽한 수비 리바운드를 쟁취했어요!" }
        },
        locationTipTitle: "박스아웃(Box-out) 3단계 공식",
        locationTipDesc: "1. 슛 순간 상대 확인(Contact) -> 2. 등을 돌려 엉덩이로 밀어내기(Seal) -> 3. 두 손으로 안전하게 낚아채기(Secure)!",
        voiceScript: "슛이 날아갈 때 절대 공만 쳐다보지 마세요! 상대를 먼저 등 뒤에 가두고 엉덩이로 밀어내는 박스아웃이 필수입니다!"
      },
      {
        id: 10,
        title: "5대5 엔드라인 베이스라인 인바운드 패스 차단",
        shortName: "인바운드 방어",
        situationDesc: "경기 종료 직전, 상대가 우리 골대 밑 엔드라인 밖에서 패스를 넣으려 해요! <strong>패서(공 던지는 사람)를 가로막는 당신의 수비 위치는?</strong>",
        attacker: { x: 220, y: 24, angle: 180, label: "인바운더 (선 밖)" },
        axisTarget: { x: 240, y: 80 },
        otherPlayers: [
          { type: 'att', x: 320, y: 140, angle: 180, number: '10', name: '골밑 컷인' },
          { type: 'att', x: 300, y: 260, angle: 180, number: '1', name: '하이포스트' },
          { type: 'att', x: 480, y: 100, angle: 180, number: '7', name: '코너 슈터' },
          { type: 'att', x: 140, y: 260, angle: 180, number: '9', name: '외곽 탈출' },
          { type: 'def', x: 310, y: 110, angle: 0, number: '5', name: '골밑 차단' },
          { type: 'def', x: 300, y: 220, angle: 0, number: '2', name: '하이 수비' },
          { type: 'def', x: 440, y: 90, angle: 0, number: '3', name: '코너 디나이' },
          { type: 'def', x: 170, y: 220, angle: 0, number: '4', name: '윙 디나이' }
        ],
        correctChoice: 'B',
        choices: {
          A: { x: 220, y: 25, angle: 0, label: "엔드라인 선을 밟고 상대에게 밀착하기", isCorrect: false, feedbackTitle: "테크니컬 파울 & 자유투 실점!", feedbackDesc: "인바운더의 경계선을 침범하면 심판의 테크니컬 파울 휘슬이 불려요!" },
          B: { x: 230, y: 65, angle: 0, label: "선 안쪽에서 양팔을 풍차처럼 흔들며 골밑 패스 차단", isCorrect: true, feedbackTitle: "5초 바이얼레이션 & 스틸 성공!", feedbackDesc: "선을 침범하지 않고 림으로 가는 패스 길목을 온몸으로 가로막아 승리를 확정지었어요!" },
          C: { x: 280, y: 150, angle: 0, label: "골대 밑으로 쑥 물러서기", isCorrect: false, feedbackTitle: "원하는 공격수에게 프리패스 허용!", feedbackDesc: "패서를 방해하지 않으면 상대가 정해진 전술대로 편안하게 패스를 넣어버려요." }
        },
        locationTipTitle: "인바운더 수비의 핵심 포인트",
        locationTipDesc: "절대 엔드라인 선을 넘지 마세요! 선에서 반 발 물러서서 양손을 부지런히 흔들어 가장 위험한 골밑 직행 패스를 온몸으로 차단해야 해요!",
        voiceScript: "인바운드 수비에서는 선을 밟지 않도록 주의하며, 양손을 크게 흔들어 골밑으로 향하는 다이렉트 패스를 완벽하게 막아내세요!"
      }
    ]
  };

  // DOM 요소 선택
  const modeTabBtns = document.querySelectorAll('.mode-tab-btn');
  const otherPlayersGroup = document.getElementById('otherPlayersGroup');
  const attackerMarker = document.getElementById('attackerMarker');
  const attackerFeetGroup = document.getElementById('attackerFeetGroup');
  const attackerLabelText = document.getElementById('attackerLabelText');
  const defenseCandidatesGroup = document.getElementById('defenseCandidatesGroup');
  const quizNavBar = document.getElementById('quizNavBar');
  const boardControlsBar = document.getElementById('boardControlsBar');
  const matchCountMinusBtn = document.getElementById('matchCountMinusBtn');
  const matchCountPlusBtn = document.getElementById('matchCountPlusBtn');
  const matchCountDisplay = document.getElementById('matchCountDisplay');
  const matchChipsRow = document.getElementById('matchChipsRow');
  const addAttackerBtn = document.getElementById('addAttackerBtn');
  const addDefenderBtn = document.getElementById('addDefenderBtn');
  const clearBoardBtn = document.getElementById('clearBoardBtn');
  const toggleGuideLines = document.getElementById('toggleGuideLines');

  const boardRotationToolbar = document.getElementById('boardRotationToolbar');
  const rotateTargetLabel = document.getElementById('rotateTargetLabel');
  const rotateLeftBtn = document.getElementById('rotateLeftBtn');
  const rotateRightBtn = document.getElementById('rotateRightBtn');
  const rotateFaceRimBtn = document.getElementById('rotateFaceRimBtn');

  const boardDragLayer = document.getElementById('boardDragLayer');
  const boardGuideGroup = document.getElementById('boardGuideGroup');
  const boardAxisLine = document.getElementById('boardAxisLine');
  const idealDefenseZone = document.getElementById('idealDefenseZone');
  const boardPlayersGroup = document.getElementById('boardPlayersGroup');

  const defenseAxisLine = document.getElementById('defenseAxisLine');
  const instructionBanner = document.getElementById('instructionBanner');
  const currentQuizBadge = document.getElementById('currentQuizBadge');
  const currentQuizTitle = document.getElementById('currentQuizTitle');
  const courtBottomQuizCard = document.getElementById('courtBottomQuizCard');
  const courtQuizDesc = document.getElementById('courtQuizDesc');
  const courtQuizBadge = document.getElementById('courtQuizBadge');
  const courtQuizTitle = document.getElementById('courtQuizTitle');
  const topTooltipLayer = document.getElementById('topTooltipLayer');
  const topTooltipBg = document.getElementById('topTooltipBg');
  const topTooltipArrow = document.getElementById('topTooltipArrow');
  const topTooltipText = document.getElementById('topTooltipText');
  const feedbackToast = document.getElementById('feedbackToast');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackDesc = document.getElementById('feedbackDesc');
  const guideModal = document.getElementById('guideModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const nextOrRetryBtn = document.getElementById('nextOrRetryBtn');
  const modalActionBtnText = document.getElementById('modalActionBtnText');
  const resetAppBtn = document.getElementById('resetAppBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const ttsSpeakBtn = document.getElementById('ttsSpeakBtn');
  const helperTitle = document.getElementById('helperTitle');
  const helperText = document.getElementById('helperText');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const quizChipsContainer = document.getElementById('quizChipsContainer');
  const prevQuizBtn = document.getElementById('prevQuizBtn');
  const nextQuizBtn = document.getElementById('nextQuizBtn');
  const scoreText = document.getElementById('scoreText');
  const locationTipTitle = document.getElementById('locationTipTitle');
  const locationTipDesc = document.getElementById('locationTipDesc');
  const clearModal = document.getElementById('clearModal');
  const clearModalTitle = document.getElementById('clearModalTitle');
  const clearModalSub = document.getElementById('clearModalSub');
  const clearModalPraise = document.getElementById('clearModalPraise');
  const replayAllBtn = document.getElementById('replayAllBtn');
  const finalScoreText = document.getElementById('finalScoreText');

  // 상태 관리
  let currentMode = '1v1'; // '1v1' | '2v2' | '3v3' | '5v5' | 'board'
  let currentQuizIndex = 0;
  let solvedQuizzes = {
    '1v1': new Set(),
    '2v2': new Set(),
    '3v3': new Set(),
    '5v5': new Set()
  };
  let soundEnabled = true;
  let currentStep = 'init';
  let autoOpenGuideTimer = null;

  // ================= 1. Web Audio 사운드 =================
  class SoundEffects {
    constructor() { this.ctx = null; }
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    playClick() {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    }
    playCorrect() {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.25);
      });
    }
    playWrong() {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [330, 246.94];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.14);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.14 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.14);
        osc.stop(this.ctx.currentTime + idx * 0.14 + 0.2);
      });
    }
  }
  const sfx = new SoundEffects();

  // ================= 2. 컨페티 폭죽 =================
  class ConfettiEffect {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    burst() {
      this.particles = [];
      const colors = ['#ea580c', '#f97316', '#10b981', '#2563eb', '#fbbf24', '#ec4899'];
      for (let i = 0; i < 70; i++) {
        this.particles.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.7) * 18,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          gravity: 0.35,
          opacity: 1
        });
      }
      if (!this.animationId) this.render();
    }
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach((p, index) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
        if (p.opacity <= 0 || p.y > window.innerHeight) {
          this.particles.splice(index, 1);
        }
      });
      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.render());
      } else {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  const confetti = new ConfettiEffect(confettiCanvas);

  // ================= 3. TTS 음성 안내 =================
  function speakCurrentQuizGuide() {
    if (!('speechSynthesis' in window)) {
      alert('죄송해요, 현재 브라우저는 음성 읽기 기능을 지원하지 않아요!');
      return;
    }
    window.speechSynthesis.cancel();
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    const script = `${q.title}! ${q.voiceScript} 무릎을 굽히고, 빨간색 공격수를 주시하며 올바른 발자국 스탠스를 지키세요!`;

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang.includes('ko'));
    if (koreanVoice) utterance.voice = koreanVoice;

    window.speechSynthesis.speak(utterance);
  }

  // ================= 4. 모드 전환 핸들러 =================
  modeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedMode = btn.getAttribute('data-mode');
      if (currentMode === selectedMode) return;
      sfx.playClick();
      modeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentMode = selectedMode;

      if (currentMode === 'board') {
        if (quizNavBar) quizNavBar.classList.add('hidden');
        if (boardControlsBar) boardControlsBar.classList.remove('hidden');
        initBoardMode();
      } else {
        if (boardControlsBar) boardControlsBar.classList.add('hidden');
        if (boardRotationToolbar) boardRotationToolbar.classList.add('hidden');
        if (quizNavBar) quizNavBar.classList.remove('hidden');
        if (boardDragLayer) boardDragLayer.classList.add('hidden');
        if (attackerMarker) attackerMarker.style.display = 'block';
        currentQuizIndex = 0;
        initNavChips();
        loadQuiz(0);
      }
    });
  });

  // ================= 5. 네비게이션 칩 UI 초기화 =================
  function initNavChips() {
    if (currentMode === 'board' || !modeData[currentMode]) return;
    quizChipsContainer.innerHTML = '';
    const qList = modeData[currentMode];
    qList.forEach((q, index) => {
      const chip = document.createElement('button');
      chip.className = `quiz-chip-btn ${index === currentQuizIndex ? 'active' : ''}`;
      chip.id = `chipQuiz${q.id}`;
      chip.innerHTML = `${q.id}`;
      chip.title = `${q.id}번: ${q.title}`;
      chip.addEventListener('click', () => {
        sfx.playClick();
        loadQuiz(index);
      });
      quizChipsContainer.appendChild(chip);
    });
    updateNavState();
  }

  function updateNavState() {
    if (currentMode === 'board' || !modeData[currentMode]) return;
    const qList = modeData[currentMode];
    const modeSolved = solvedQuizzes[currentMode];

    qList.forEach((q, index) => {
      const chip = document.getElementById(`chipQuiz${q.id}`);
      if (chip) {
        chip.classList.toggle('active', index === currentQuizIndex);
        chip.classList.toggle('solved', modeSolved.has(q.id));
      }
    });

    prevQuizBtn.disabled = (currentQuizIndex === 0);
    nextQuizBtn.disabled = (currentQuizIndex === qList.length - 1);
    scoreText.innerText = `맞힌 문제: ${modeSolved.size} / ${qList.length}`;
  }

  // ================= 5-1. 자유 전술판 엔진 (1:1~5:5, 드래그 & 회전) =================
  let boardPlayers = [];
  let currentBoardMatchSize = 2; // 1 ~ 5
  let selectedPlayerId = null;   // 현재 선택된 선수 ID
  let activeDragId = null;       // 이동 드래그 중인 선수 ID
  let activeRotateId = null;     // 회전 조작 중인 선수 ID
  let dragStartPos = { x: 0, y: 0 };
  let hasMovedSignificantly = false;
  let showGuides = true;

  // 1대1 ~ 5대5 기본 배치 프리셋
  function getMatchPresets(size) {
    if (size === 1) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 460, angle: 0, number: '7', label: '공 가진 공격수' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 360, angle: 180, number: '10', label: '수비 대장' }
      ];
    }
    if (size === 2) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 460, angle: 0, number: '7', label: '공 가진 #7' },
        { id: 'att_2', type: 'att', hasBall: false, x: 440, y: 380, angle: -25, number: '9', label: '공격수 9' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 360, angle: 180, number: '10', label: '수비 대장' },
        { id: 'def_2', type: 'def', isPlayer: false, x: 380, y: 310, angle: 155, number: '3', label: '동료 수비' }
      ];
    }
    if (size === 3) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 460, angle: 0, number: '1', label: '탑 볼핸들러' },
        { id: 'att_2', type: 'att', hasBall: false, x: 160, y: 380, angle: 25, number: '7', label: '좌측 윙' },
        { id: 'att_3', type: 'att', hasBall: false, x: 440, y: 380, angle: -25, number: '9', label: '우측 윙' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 360, angle: 180, number: '10', label: '수비 대장' },
        { id: 'def_2', type: 'def', isPlayer: false, x: 230, y: 320, angle: -155, number: '2', label: '수비 2' },
        { id: 'def_3', type: 'def', isPlayer: false, x: 370, y: 320, angle: 155, number: '3', label: '수비 3' }
      ];
    }
    if (size === 4) {
      return [
        { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 470, angle: 0, number: '1', label: '탑 볼핸들러' },
        { id: 'att_2', type: 'att', hasBall: false, x: 150, y: 380, angle: 25, number: '7', label: '좌측 윙' },
        { id: 'att_3', type: 'att', hasBall: false, x: 450, y: 380, angle: -25, number: '9', label: '우측 윙' },
        { id: 'att_4', type: 'att', hasBall: false, x: 430, y: 220, angle: -80, number: '13', label: '코너/포스트' },
        { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 370, angle: 180, number: '10', label: '수비 대장' },
        { id: 'def_2', type: 'def', isPlayer: false, x: 220, y: 320, angle: -155, number: '2', label: '좌측 수비' },
        { id: 'def_3', type: 'def', isPlayer: false, x: 380, y: 320, angle: 155, number: '3', label: '우측 수비' },
        { id: 'def_4', type: 'def', isPlayer: false, x: 370, y: 200, angle: 100, number: '4', label: '골밑 수비' }
      ];
    }
    // size === 5 (정규 5대5)
    return [
      { id: 'att_1', type: 'att', hasBall: true, x: 300, y: 480, angle: 0, number: '1', label: 'PG 탑' },
      { id: 'att_2', type: 'att', hasBall: false, x: 450, y: 380, angle: -25, number: '2', label: 'SG 우측 윙' },
      { id: 'att_3', type: 'att', hasBall: false, x: 150, y: 380, angle: 25, number: '3', label: 'SF 좌측 윙' },
      { id: 'att_4', type: 'att', hasBall: false, x: 430, y: 220, angle: -80, number: '4', label: 'PF 우측 코너' },
      { id: 'att_5', type: 'att', hasBall: false, x: 170, y: 220, angle: 80, number: '5', label: 'C 좌측 포스트' },
      { id: 'def_1', type: 'def', isPlayer: true, x: 300, y: 380, angle: 180, number: '10', label: '수비 대장' },
      { id: 'def_2', type: 'def', isPlayer: false, x: 380, y: 320, angle: 155, number: '2', label: '우측 윙 수비' },
      { id: 'def_3', type: 'def', isPlayer: false, x: 220, y: 320, angle: -155, number: '3', label: '좌측 윙 수비' },
      { id: 'def_4', type: 'def', isPlayer: false, x: 360, y: 200, angle: 100, number: '4', label: '우측 포스트 수비' },
      { id: 'def_5', type: 'def', isPlayer: false, x: 240, y: 200, angle: -100, number: '5', label: '좌측 포스트 수비' }
    ];
  }

  function loadMatchSize(size) {
    currentBoardMatchSize = Math.max(1, Math.min(5, size));
    boardPlayers = getMatchPresets(currentBoardMatchSize);
    selectedPlayerId = boardPlayers[0] ? boardPlayers[0].id : null;

    if (matchCountDisplay) {
      matchCountDisplay.innerText = `${currentBoardMatchSize} vs ${currentBoardMatchSize}`;
    }
    if (matchCountMinusBtn) matchCountMinusBtn.disabled = (currentBoardMatchSize <= 1);
    if (matchCountPlusBtn) matchCountPlusBtn.disabled = (currentBoardMatchSize >= 5);

    if (matchChipsRow) {
      const chips = matchChipsRow.querySelectorAll('.match-chip');
      chips.forEach(c => {
        const sz = parseInt(c.dataset.size, 10);
        c.classList.toggle('active', sz === currentBoardMatchSize);
      });
    }

    updateSelectedPlayerToolbar();
    renderBoard();
  }

  function updateSelectedPlayerToolbar() {
    if (!boardRotationToolbar) return;
    if (currentMode !== 'board') {
      boardRotationToolbar.classList.add('hidden');
      return;
    }

    const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
    if (!p) {
      boardRotationToolbar.classList.add('hidden');
      return;
    }

    boardRotationToolbar.classList.remove('hidden');
    if (rotateTargetLabel) {
      const isAtt = (p.type === 'att');
      const badgeText = isAtt ? (p.hasBall ? '🔴 공 가진 공격수' : '🔴 공격수') : '🔵 수비수';
      const curDeg = Math.round(((p.angle || 0) % 360 + 360) % 360);
      rotateTargetLabel.innerHTML = `선택 선수: <strong>${badgeText}</strong> (${curDeg}°)`;
    }
  }

  function initBoardMode() {
    if (autoOpenGuideTimer) clearTimeout(autoOpenGuideTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    // 퀴즈 전용 레이어 모두 숨김
    defenseCandidatesGroup.classList.add('hidden');
    if (attackerMarker) attackerMarker.style.display = 'none';
    defenseAxisLine.classList.remove('visible');
    otherPlayersGroup.innerHTML = '';
    feedbackToast.classList.add('hidden');
    guideModal.classList.add('hidden');
    hideCandidateTooltip();

    const bubble = document.getElementById('clickMeBubble');
    if (bubble) bubble.style.display = 'none';

    // 전술판 레이어 표시
    if (boardDragLayer) boardDragLayer.classList.remove('hidden');
    if (courtBottomQuizCard) courtBottomQuizCard.classList.remove('hidden');

    currentQuizBadge.innerText = '📋 자유 전술판';
    currentQuizTitle.innerHTML = '<span class="highlight">1:1부터 5:5까지 직접 배치하고 발자국 방향을 돌려보세요!</span>';

    helperTitle.innerText = '자유 전술판 도움말';
    helperText.innerHTML = '선수를 드래그해 자유롭게 배치하고, <strong>마우스 휠이나 하단 회전 버튼으로 발자국 방향을 조절</strong>해 보세요! <strong>공격수를 클릭하면 패스</strong>됩니다.';

    // 기본 2대2 로드
    loadMatchSize(2);
  }

  function createBoardPlayerSvg(p, isGoodDefense) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = `bPlayer_${p.id}`;
    const isSelected = (p.id === selectedPlayerId);
    g.className.baseVal = `draggable-player ${p.type === 'att' ? 'player-att' : 'player-def'} ${isGoodDefense ? 'good-defense' : ''} ${isSelected ? 'selected' : ''}`;
    g.setAttribute('transform', `translate(${p.x}, ${p.y})`);
    g.dataset.id = p.id;

    const isAtt = p.type === 'att';
    const color = isAtt ? '#ef4444' : '#2563eb';
    const labelColor = isAtt ? '#b91c1c' : '#1d4ed8';

    // 각도 결정
    if (p.angle === undefined) {
      const dx = 300 - p.x;
      const dy = 78 - p.y;
      let angle = (Math.atan2(dy, dx) * 180 / Math.PI) - 90;
      if (!isAtt) angle += 180;
      p.angle = Math.round(angle);
    }

    let innerBadgeHtml = '';
    // 공을 가진 공격수만 농구공(🏀) 마크를 표시하고, 그 외의 10, 3, 9 등의 숫자는 모두 삭제하여 발자국이 훤히 보이게 함!
    if (isAtt && p.hasBall) {
      innerBadgeHtml = `
        <g class="feet-badge-group" transform="translate(0, 0)">
          <circle cx="0" cy="0" r="12" fill="#f97316" stroke="#ffffff" stroke-width="2" filter="url(#badgeShadow)" />
          <path d="M -12 0 C -3 -3 3 -3 12 0" stroke="#7c2d12" stroke-width="1.2" fill="none"/>
          <path d="M 0 -12 C 3 -3 3 3 0 12" stroke="#7c2d12" stroke-width="1.2" fill="none"/>
          <path d="M -8 -8 L 8 8" stroke="#7c2d12" stroke-width="1" fill="none"/>
        </g>
      `;
    }

    // 마커 베이스 원 (반경 38), 큼직해진 발자국 & 앞뒤 명확한 디테일
    // 화살표 끝 동그라미 손잡이는 모두 삭제하여 화살표만 깔끔하게 표시
    g.innerHTML = `
      <circle class="cand-zone-circle" cx="0" cy="0" r="38" fill="#e2e8f0" stroke="${color}" stroke-width="2.8" />
      <g class="feet-rotate-group" transform="rotate(${p.angle})">
        <!-- 앞방향 가이드 점선 및 화살표 -->
        <line x1="0" y1="-26" x2="0" y2="-48" stroke="${color}" stroke-width="3" stroke-dasharray="4 2" marker-end="url(${isAtt ? '#dirArrowRed' : '#dirArrowBlue'})"/>
        <g transform="translate(-16, 0)"><use href="#shoeSoleLeft" fill="${color}"/></g>
        <g transform="translate(16, 0)"><use href="#shoeSoleRight" fill="${color}"/></g>
      </g>
      ${innerBadgeHtml}
    `;

    return g;
  }

  function calculateBoardState() {
    // 볼 핸들러 공격수 찾기
    let ballAtt = boardPlayers.find(p => p.type === 'att' && p.hasBall);
    if (!ballAtt) {
      const firstAtt = boardPlayers.find(p => p.type === 'att');
      if (firstAtt) {
        firstAtt.hasBall = true;
        ballAtt = firstAtt;
      }
    }

    const mainDef = boardPlayers.find(p => p.type === 'def' && p.isPlayer) || boardPlayers.find(p => p.type === 'def');
    let isGoodDefense = false;
    let feedbackStatus = '';

    if (ballAtt && mainDef) {
      const rimX = 300, rimY = 78;
      const dAx = ballAtt.x - rimX;
      const dAy = ballAtt.y - rimY;
      const distRimToBall = Math.hypot(dAx, dAy);

      // 공격수 앞 약 95px 지점 (팔 하나 거리)
      const idealDist = Math.max(50, distRimToBall - 95);
      const idealRatio = distRimToBall > 0 ? idealDist / distRimToBall : 0.8;
      const idealX = rimX + dAx * idealRatio;
      const idealY = rimY + dAy * idealRatio;

      if (boardAxisLine) {
        boardAxisLine.setAttribute('x1', rimX.toString());
        boardAxisLine.setAttribute('y1', rimY.toString());
        boardAxisLine.setAttribute('x2', ballAtt.x.toString());
        boardAxisLine.setAttribute('y2', ballAtt.y.toString());
      }
      if (idealDefenseZone) {
        idealDefenseZone.setAttribute('transform', `translate(${idealX}, ${idealY})`);
      }

      const distDefToBall = Math.hypot(mainDef.x - ballAtt.x, mainDef.y - ballAtt.y);
      const distDefToIdeal = Math.hypot(mainDef.x - idealX, mainDef.y - idealY);

      if (distDefToIdeal < 45) {
        isGoodDefense = true;
        feedbackStatus = '🎉 완벽한 수비 위치! (골대-공격수 사이 차단 + 팔 하나 거리 확보)';
      } else if (distDefToBall < 65) {
        feedbackStatus = '⚠️ 너무 바짝 붙었어요! 돌파당하기 쉬우니 팔 하나 거리(약 1m)로 물러서세요.';
      } else if (distDefToBall > 145) {
        feedbackStatus = '⚠️ 너무 멀어요! 슛을 허용하니 골대-공격수 사이로 조금 더 다가가세요.';
      } else {
        feedbackStatus = '💡 수비수를 골대와 공 가진 공격수 사이(황금색 점선 위)에 놓아보세요!';
      }
    } else {
      feedbackStatus = '선수를 코트에 자유롭게 배치해보세요!';
    }

    if (boardGuideGroup) {
      boardGuideGroup.style.display = (showGuides && ballAtt) ? 'block' : 'none';
    }

    if (courtQuizDesc) {
      courtQuizDesc.innerHTML = `<span style="color:#059669; font-weight:800;">[실시간 수비 분석]</span> ${feedbackStatus}`;
    }
    if (courtQuizBadge) courtQuizBadge.innerText = `자유 전술판 (${currentBoardMatchSize}vs${currentBoardMatchSize})`;
    if (courtQuizTitle) {
      courtQuizTitle.innerText = ballAtt ? `공격수를 막는 최적의 수비 위치를 연구해보세요!` : '선수를 드래그해보세요!';
    }

    return { ballAtt, mainDef, isGoodDefense };
  }

  function updateBoardPositionsOnly() {
    const { mainDef, isGoodDefense } = calculateBoardState();

    boardPlayers.forEach(p => {
      const el = document.getElementById(`bPlayer_${p.id}`);
      if (!el) return;

      el.setAttribute('transform', `translate(${p.x}, ${p.y})`);

      // 회전 각도 갱신
      const rotEl = el.querySelector('.feet-rotate-group');
      if (rotEl) {
        rotEl.setAttribute('transform', `rotate(${p.angle})`);
      }

      const isSelected = (p.id === selectedPlayerId);
      el.classList.toggle('selected', isSelected);

      if (p === mainDef) {
        el.classList.toggle('good-defense', isGoodDefense);
      } else {
        el.classList.remove('good-defense');
      }
    });

    updateSelectedPlayerToolbar();
  }

  function renderBoard() {
    if (!boardPlayersGroup) return;
    boardPlayersGroup.innerHTML = '';

    const { mainDef, isGoodDefense } = calculateBoardState();

    boardPlayers.forEach(p => {
      const el = createBoardPlayerSvg(p, isGoodDefense && p === mainDef);
      boardPlayersGroup.appendChild(el);
    });

    updateSelectedPlayerToolbar();
  }

  // 드래그 좌표 변환 유틸
  function getSvgCoordinates(evt) {
    const svg = document.getElementById('courtSvg');
    if (!svg) return { x: 300, y: 400 };
    const pt = svg.createSVGPoint();
    if (evt.touches && evt.touches.length > 0) {
      pt.x = evt.touches[0].clientX;
      pt.y = evt.touches[0].clientY;
    } else {
      pt.x = evt.clientX;
      pt.y = evt.clientY;
    }
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  // 드래그 앤 드롭 마우스/터치 리스너 (이동 + 회전)
  function setupBoardDragListeners() {
    const svg = document.getElementById('courtSvg');
    if (!svg) return;

    function handleStart(e) {
      if (currentMode !== 'board') return;

      // 선수 마커 이동 확인
      const target = e.target.closest('.draggable-player');
      if (!target) return;

      activeDragId = target.dataset.id;
      selectedPlayerId = activeDragId;
      const pt = getSvgCoordinates(e);
      dragStartPos = { x: pt.x, y: pt.y };
      hasMovedSignificantly = false;

      target.classList.add('dragging');
      updateBoardPositionsOnly();
      if (e.type === 'touchstart') e.preventDefault();
    }

    function handleMove(e) {
      if (currentMode !== 'board') return;

      // 이동 드래그 중:
      if (activeDragId) {
        const pt = getSvgCoordinates(e);
        if (Math.hypot(pt.x - dragStartPos.x, pt.y - dragStartPos.y) > 4) {
          hasMovedSignificantly = true;
        }

        const p = boardPlayers.find(item => item.id === activeDragId);
        if (p) {
          p.x = Math.max(50, Math.min(550, Math.round(pt.x)));
          p.y = Math.max(60, Math.min(680, Math.round(pt.y)));

          // 사용자가 수동으로 돌린 적이 없다면 골대 상대 각도로 자동 갱신
          if (!p.hasCustomAngle) {
            const dx = 300 - p.x;
            const dy = 78 - p.y;
            let angle = (Math.atan2(dy, dx) * 180 / Math.PI) - 90;
            if (p.type !== 'att') angle += 180;
            p.angle = Math.round(angle);
          }
          updateBoardPositionsOnly();
        }
        if (e.type === 'touchmove') e.preventDefault();
      }
    }

    function handleEnd() {
      if (activeDragId) {
        // 만약 짧은 클릭이었으면:
        if (!hasMovedSignificantly) {
          const clickedPlayer = boardPlayers.find(p => p.id === activeDragId);
          if (clickedPlayer && clickedPlayer.type === 'att') {
            // 공격수를 클릭하면 공(🏀) 소유권 패스!
            boardPlayers.forEach(p => {
              if (p.type === 'att') p.hasBall = (p.id === clickedPlayer.id);
            });
            sfx.playClick();
            renderBoard();
          }
        }

        const el = document.getElementById(`bPlayer_${activeDragId}`);
        if (el) el.classList.remove('dragging');

        activeDragId = null;
        hasMovedSignificantly = false;
      }
    }

    svg.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    svg.addEventListener('touchstart', handleStart, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    // 마우스 휠로 선택/호버된 선수의 발자국 방향(각도) 15도씩 부드럽게 조절
    svg.addEventListener('wheel', (e) => {
      if (currentMode !== 'board') return;
      const target = e.target.closest('.draggable-player');
      const targetId = target ? target.dataset.id : selectedPlayerId;
      if (!targetId) return;

      const p = boardPlayers.find(item => item.id === targetId);
      if (p) {
        e.preventDefault();
        selectedPlayerId = targetId;
        const delta = e.deltaY > 0 ? 15 : -15;
        p.angle = ((p.angle || 0) + delta + 360) % 360;
        p.hasCustomAngle = true;
        updateBoardPositionsOnly();
      }
    }, { passive: false });
    window.addEventListener('touchend', handleEnd);
  }

  // 툴바 버튼 이벤트 바인딩
  if (matchCountMinusBtn) {
    matchCountMinusBtn.addEventListener('click', () => {
      sfx.playClick();
      if (currentBoardMatchSize > 1) {
        loadMatchSize(currentBoardMatchSize - 1);
      }
    });
  }

  if (matchCountPlusBtn) {
    matchCountPlusBtn.addEventListener('click', () => {
      sfx.playClick();
      if (currentBoardMatchSize < 5) {
        loadMatchSize(currentBoardMatchSize + 1);
      }
    });
  }

  if (matchChipsRow) {
    const chips = matchChipsRow.querySelectorAll('.match-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        sfx.playClick();
        const sz = parseInt(chip.dataset.size, 10);
        if (sz >= 1 && sz <= 5) {
          loadMatchSize(sz);
        }
      });
    });
  }

  if (addAttackerBtn) {
    addAttackerBtn.addEventListener('click', () => {
      sfx.playClick();
      const attCount = boardPlayers.filter(p => p.type === 'att').length + 1;
      const newAtt = {
        id: `att_${Date.now()}`,
        type: 'att',
        hasBall: false,
        x: 200 + Math.floor(Math.random() * 200),
        y: 350 + Math.floor(Math.random() * 150),
        number: attCount.toString(),
        label: `공격수 ${attCount}`,
        angle: 0
      };
      boardPlayers.push(newAtt);
      selectedPlayerId = newAtt.id;
      renderBoard();
    });
  }

  if (addDefenderBtn) {
    addDefenderBtn.addEventListener('click', () => {
      sfx.playClick();
      const defCount = boardPlayers.filter(p => p.type === 'def').length + 1;
      const newDef = {
        id: `def_${Date.now()}`,
        type: 'def',
        isPlayer: false,
        x: 220 + Math.floor(Math.random() * 160),
        y: 250 + Math.floor(Math.random() * 150),
        number: defCount.toString(),
        label: `수비수 ${defCount}`,
        angle: 180
      };
      boardPlayers.push(newDef);
      selectedPlayerId = newDef.id;
      renderBoard();
    });
  }

  if (clearBoardBtn) {
    clearBoardBtn.addEventListener('click', () => {
      sfx.playClick();
      loadMatchSize(1);
    });
  }

  if (toggleGuideLines) {
    toggleGuideLines.addEventListener('change', (e) => {
      showGuides = e.target.checked;
      renderBoard();
    });
  }

  // 발자국 회전 버튼 이벤트 바인딩
  if (rotateLeftBtn) {
    rotateLeftBtn.addEventListener('click', () => {
      sfx.playClick();
      const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
      if (p) {
        p.angle = ((p.angle || 0) - 30 + 360) % 360;
        p.hasCustomAngle = true;
        updateBoardPositionsOnly();
      }
    });
  }

  if (rotateRightBtn) {
    rotateRightBtn.addEventListener('click', () => {
      sfx.playClick();
      const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
      if (p) {
        p.angle = ((p.angle || 0) + 30) % 360;
        p.hasCustomAngle = true;
        updateBoardPositionsOnly();
      }
    });
  }

  if (rotateFaceRimBtn) {
    rotateFaceRimBtn.addEventListener('click', () => {
      sfx.playClick();
      const p = boardPlayers.find(item => item.id === selectedPlayerId) || boardPlayers[0];
      if (p) {
        const dx = 300 - p.x;
        const dy = 78 - p.y;
        let angle = (Math.atan2(dy, dx) * 180 / Math.PI) - 90;
        if (p.type !== 'att') angle += 180;
        p.angle = Math.round(angle);
        p.hasCustomAngle = false;
        updateBoardPositionsOnly();
      }
    });
  }

  setupBoardDragListeners();

  // ================= 6. 다른 동료 선수들 SVG 렌더링 =================
  function renderOtherPlayers(players) {
    otherPlayersGroup.innerHTML = '';
    if (!players || players.length === 0) return;

    players.forEach(p => {
      const isAtt = (p.type === 'att');
      const color = isAtt ? '#ef4444' : '#2563eb';
      const labelBg = isAtt ? '#b91c1c' : '#1d4ed8';

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'teammate-marker');
      g.setAttribute('transform', `translate(${p.x}, ${p.y})`);

      // 1. 회색 바탕 동그라미 베이스 (r: 30으로 넉넉하게 확장)
      const baseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      baseCircle.setAttribute('cx', '0');
      baseCircle.setAttribute('cy', '0');
      baseCircle.setAttribute('r', '30');
      baseCircle.setAttribute('fill', '#e2e8f0');
      baseCircle.setAttribute('stroke', '#94a3b8');
      baseCircle.setAttribute('stroke-width', '2');
      g.appendChild(baseCircle);

      // 2. 발자국 2개 (앞뒤가 뚜렷한 리뉴얼 디자인 & 방향 화살표)
      const feetG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      feetG.setAttribute('transform', `rotate(${p.angle || 0})`);

      // 앞방향 가이드 점선 화살표
      const dirLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      dirLine.setAttribute('x1', '0');
      dirLine.setAttribute('y1', '-18');
      dirLine.setAttribute('x2', '0');
      dirLine.setAttribute('y2', '-36');
      dirLine.setAttribute('stroke', color);
      dirLine.setAttribute('stroke-width', '2.5');
      dirLine.setAttribute('stroke-dasharray', '3 2');
      dirLine.setAttribute('marker-end', `url(${isAtt ? '#dirArrowRed' : '#dirArrowBlue'})`);
      feetG.appendChild(dirLine);

      // 큼직하고 선명한 왼발 & 오른발 (동그라미 안 숫자 뱃지 삭제로 발자국 전체가 온전히 보임!)
      const leftFoot = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      leftFoot.setAttribute('href', '#shoeSoleLeft');
      leftFoot.setAttribute('fill', color);
      leftFoot.setAttribute('transform', 'translate(-12, 0) scale(0.82)');

      const rightFoot = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      rightFoot.setAttribute('href', '#shoeSoleRight');
      rightFoot.setAttribute('fill', color);
      rightFoot.setAttribute('transform', 'translate(12, 0) scale(0.82)');

      feetG.appendChild(leftFoot);
      feetG.appendChild(rightFoot);
      g.appendChild(feetG);

      // 3. 미니 이름 태그 (동그라미 안 숫자는 모두 제거하고 하단 태그만 깔끔하게 표시)
      const tagG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      tagG.setAttribute('transform', 'translate(0, 26)');

      const tagRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      tagRect.setAttribute('x', '-34');
      tagRect.setAttribute('y', '0');
      tagRect.setAttribute('width', '68');
      tagRect.setAttribute('height', '16');
      tagRect.setAttribute('rx', '8');
      tagRect.setAttribute('fill', labelBg);
      tagRect.setAttribute('stroke', '#ffffff');
      tagRect.setAttribute('stroke-width', '1');
      tagG.appendChild(tagRect);

      const tagText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tagText.setAttribute('x', '0');
      tagText.setAttribute('y', '11.5');
      tagText.setAttribute('text-anchor', 'middle');
      tagText.setAttribute('fill', '#ffffff');
      tagText.setAttribute('font-size', '9.5');
      tagText.setAttribute('font-weight', 'bold');
      tagText.setAttribute('font-family', "'Noto Sans KR'");
      tagText.textContent = p.name;
      tagG.appendChild(tagText);

      g.appendChild(tagG);
      otherPlayersGroup.appendChild(g);
    });
  }

  // ================= 7. 특정 퀴즈 로드 및 SVG 배치 =================
  function loadQuiz(index) {
    if (autoOpenGuideTimer) clearTimeout(autoOpenGuideTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    currentQuizIndex = index;
    currentStep = 'init';
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];

    // 동료 선수들 렌더링
    renderOtherPlayers(q.otherPlayers);

    // 공격자 마커 위치 및 빨간색 발자국 각도
    attackerMarker.setAttribute('transform', `translate(${q.attacker.x}, ${q.attacker.y})`);
    if (attackerFeetGroup) {
      attackerFeetGroup.setAttribute('transform', `rotate(${q.attacker.angle || 0})`);
    }
    attackerLabelText.textContent = q.attacker.label;

    // 가상 축선 설정
    defenseAxisLine.setAttribute('x1', '300');
    defenseAxisLine.setAttribute('y1', '78');
    defenseAxisLine.setAttribute('x2', q.axisTarget.x.toString());
    defenseAxisLine.setAttribute('y2', q.axisTarget.y.toString());
    defenseAxisLine.classList.remove('visible');

    // 수비 후보 마커 A, B, C 발자국 위치 & 각도 설정
    ['A', 'B', 'C'].forEach(key => {
      const choiceData = q.choices[key];
      const markerEl = document.getElementById(`candidate${key}`);
      const rotEl = document.getElementById(`candRot${key}`);

      if (markerEl && choiceData) {
        markerEl.setAttribute('transform', `translate(${choiceData.x}, ${choiceData.y})`);
        markerEl.classList.remove('highlight-correct');
      }
      if (rotEl && choiceData) {
        rotEl.setAttribute('transform', `rotate(${choiceData.angle || 180})`);
      }
    });

    hideCandidateTooltip();

    // UI 리셋
    defenseCandidatesGroup.classList.add('hidden');
    if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');
    feedbackToast.classList.add('hidden');
    guideModal.classList.add('hidden');

    const bubble = document.getElementById('clickMeBubble');
    if (bubble) bubble.style.display = 'block';

    const modeNames = { '1v1': '1대1', '2v2': '2대2', '3v3': '3대3', '5v5': '5대5' };
    if (currentQuizBadge) {
      currentQuizBadge.style.background = '';
      currentQuizBadge.innerText = `${modeNames[currentMode]} - Q${q.id}`;
    }
    currentQuizTitle.innerHTML = `<span class="highlight">${q.title}</span> - 빨간색 공격수를 눌러 퀴즈 시작!`;

    // 농구코트 하단 문제 표시 내용 세팅 (1. 상황 설명 -> 2. 뱃지 + 문제)
    if (courtQuizDesc) courtQuizDesc.innerHTML = q.situationDesc;
    if (courtQuizBadge) courtQuizBadge.innerText = `[${modeNames[currentMode]}] Q${q.id}, ${q.shortName}`;
    if (courtQuizTitle) courtQuizTitle.innerText = `${q.title}: 어디에 발을 딛고 서야 할까요?`;

    helperTitle.innerText = `수비 상황 안내 (${modeNames[currentMode]} - ${q.id}/${qList.length})`;
    helperText.innerHTML = `${q.situationDesc} 빨간색 공격자의 공을 주시하며 올바른 발자국을 골라보세요!`;

    updateNavState();
  }

  // ================= 8. 퀴즈 시작 =================
  attackerMarker.addEventListener('click', () => {
    sfx.playClick();
    startQuiz();
  });

  function startQuiz() {
    currentStep = 'quiz';
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];

    const bubble = document.getElementById('clickMeBubble');
    if (bubble) bubble.style.display = 'none';

    defenseCandidatesGroup.classList.remove('hidden');
    defenseAxisLine.classList.add('visible');
    // 별도 팝업창 대신 농구코트 하단에 문제 표시
    if (courtBottomQuizCard) courtBottomQuizCard.classList.remove('hidden');

    const modeNames = { '1v1': '1대1', '2v2': '2대2', '3v3': '3대3', '5v5': '5대5' };
    if (currentQuizBadge) {
      currentQuizBadge.style.background = '#7c3aed';
      currentQuizBadge.innerText = `${modeNames[currentMode]} Q${q.id}`;
    }
    if (currentQuizTitle) {
      currentQuizTitle.innerHTML = `수비수의 발자국은 어디에 서야 할까요? <span class="highlight">A, B, C 발자국 중 하나를 골라보세요!</span>`;
    }

    helperTitle.innerText = `수비 발자국 선택 힌트`;
    helperText.innerHTML = "공과 동료 선수들의 위치를 고려해 가장 효과적인 <strong>보라색 발자국(A, B, C)</strong>을 골라보세요!";
  }

  // ================= 9. 최상단 단일 툴팁 & 선택지 클릭 (A, B, C) =================
  function showCandidateTooltip(choiceKey) {
    if (!topTooltipLayer || !topTooltipBg || !topTooltipText || !topTooltipArrow) return;
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    if (!q || !q.choices || !q.choices[choiceKey]) return;

    const choiceData = q.choices[choiceKey];
    const labelText = choiceData.label || '';
    topTooltipText.textContent = labelText;

    // 16px 폰트에 맞춘 넉넉하고 시원한 박스 너비 계산
    const boxWidth = Math.max(115, labelText.length * 15.5 + 32);
    topTooltipBg.setAttribute('width', boxWidth);
    topTooltipBg.setAttribute('height', '36');
    topTooltipBg.setAttribute('y', '-18');
    topTooltipBg.setAttribute('rx', '18');
    topTooltipText.setAttribute('x', (boxWidth / 2).toString());
    topTooltipText.setAttribute('y', '5.5');

    // 마커가 코트 우측(x >= 330)에 있으면 툴팁을 마커 왼쪽에 띄워 오른쪽에 위치한 마커/공격수에 가려지지 않음!
    if (choiceData.x >= 330) {
      topTooltipLayer.setAttribute('transform', `translate(${choiceData.x - boxWidth - 48}, ${choiceData.y})`);
      topTooltipArrow.setAttribute('points', `${boxWidth},-7 ${boxWidth},7 ${boxWidth + 8},0`);
    } else {
      topTooltipLayer.setAttribute('transform', `translate(${choiceData.x + 48}, ${choiceData.y})`);
      topTooltipArrow.setAttribute('points', '-8,0 0,-7 0,7');
    }

    // 항상 어떤 마커나 그래픽보다도 최상단에 노출
    topTooltipLayer.style.opacity = '1';
  }

  function hideCandidateTooltip() {
    if (topTooltipLayer) {
      topTooltipLayer.style.opacity = '0';
    }
  }

  document.querySelectorAll('.candidate-marker').forEach(marker => {
    const choice = marker.getAttribute('data-choice');
    marker.addEventListener('mouseenter', () => {
      showCandidateTooltip(choice);
    });
    marker.addEventListener('mouseleave', () => {
      hideCandidateTooltip();
    });
    marker.addEventListener('click', () => {
      hideCandidateTooltip();
      handleQuizAnswer(choice);
    });
  });

  function handleQuizAnswer(choice) {
    if (currentStep === 'feedback') return;
    currentStep = 'feedback';

    hideCandidateTooltip();
    if (autoOpenGuideTimer) clearTimeout(autoOpenGuideTimer);
    if (courtBottomQuizCard) courtBottomQuizCard.classList.add('hidden');

    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];
    const selected = q.choices[choice];

    // 정답 발자국 하이라이트
    const correctMarker = document.getElementById(`candidate${q.correctChoice}`);
    if (correctMarker) correctMarker.classList.add('highlight-correct');

    if (selected.isCorrect) {
      sfx.playCorrect();
      confetti.burst();
      solvedQuizzes[currentMode].add(q.id);
      updateNavState();

      feedbackToast.className = 'feedback-toast';
      feedbackIcon.innerText = '🎉';
      feedbackTitle.innerText = selected.feedbackTitle;
      feedbackDesc.innerText = selected.feedbackDesc;
      feedbackToast.classList.remove('hidden');

      helperTitle.innerText = "수비 성공! 👏";
      helperText.innerHTML = `대단해요! 멋진 팀 수비 위치를 찾았어요. (${solvedQuizzes[currentMode].size}/${qList.length}개 완료)`;
    } else {
      sfx.playWrong();

      feedbackToast.className = 'feedback-toast wrong';
      feedbackIcon.innerText = '⚠️';
      feedbackTitle.innerText = selected.feedbackTitle;
      feedbackDesc.innerText = selected.feedbackDesc;
      feedbackToast.classList.remove('hidden');

      helperTitle.innerText = "수비 피드백 💡";
      helperText.innerHTML = "아쉬워요! 올바른 발 모양과 팀 수비 원리를 확인해 볼까요?";
    }

    autoOpenGuideTimer = setTimeout(() => {
      feedbackToast.classList.add('hidden');
      openGuideModal();
    }, 1400);
  }

  // ================= 10. 상세 가이드 모달 =================
  function openGuideModal() {
    currentStep = 'guide';
    const qList = modeData[currentMode];
    const q = qList[currentQuizIndex];

    if (locationTipTitle) locationTipTitle.innerText = q.locationTipTitle || '';
    if (locationTipDesc) locationTipDesc.innerText = q.locationTipDesc || '';

    if (currentQuizIndex < qList.length - 1) {
      modalActionBtnText.innerText = `다음 문제 (${currentQuizIndex + 2}번) 풀기 ➔`;
    } else {
      modalActionBtnText.innerText = "이 모드 최종 결과 보기 🏆";
    }

    guideModal.classList.remove('hidden');

    const modeNames = { '1v1': '1대1', '2v2': '2대2', '3v3': '3대3', '5v5': '5대5' };
    instructionBanner.innerHTML = `
      <div class="banner-badge" style="background:#10b981;">${modeNames[currentMode]} 가이드</div>
      <div class="banner-text">수비수의 <span class="highlight">발자국 스탠스, 손 모양, 시선</span>을 자세히 배워보세요!</div>
    `;
  }

  function closeGuideModal() {
    guideModal.classList.add('hidden');
  }

  closeModalBtn.addEventListener('click', () => {
    sfx.playClick();
    closeGuideModal();
  });

  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) closeGuideModal();
  });

  nextOrRetryBtn.addEventListener('click', () => {
    sfx.playClick();
    closeGuideModal();

    const qList = modeData[currentMode];
    if (currentQuizIndex < qList.length - 1) {
      loadQuiz(currentQuizIndex + 1);
    } else {
      showClearModal();
    }
  });

  function showClearModal() {
    const qList = modeData[currentMode];
    const modeNames = { '1v1': '1대1 기초', '2v2': '2대2 팀워크', '3v3': '3대3 반코트', '5v5': '5대5 정규전' };
    clearModalTitle.innerText = `축하합니다! ${modeNames[currentMode]} 마스터!`;
    clearModalSub.innerText = `${modeNames[currentMode]} 모드의 모든 수비 비법을 정복했어요!`;
    finalScoreText.innerText = `${solvedQuizzes[currentMode].size} / ${qList.length}`;
    clearModalPraise.innerText = `${modeNames[currentMode]} 전술의 수비 대장 등극! 🛡️`;
    clearModal.classList.remove('hidden');
    confetti.burst();
    sfx.playCorrect();
  }

  replayAllBtn.addEventListener('click', () => {
    sfx.playClick();
    clearModal.classList.add('hidden');
    solvedQuizzes[currentMode].clear();
    loadQuiz(0);
  });

  // ================= 11. 네비게이션 버튼 =================
  prevQuizBtn.addEventListener('click', () => {
    if (currentQuizIndex > 0) {
      sfx.playClick();
      loadQuiz(currentQuizIndex - 1);
    }
  });

  nextQuizBtn.addEventListener('click', () => {
    const qList = modeData[currentMode];
    if (currentQuizIndex < qList.length - 1) {
      sfx.playClick();
      loadQuiz(currentQuizIndex + 1);
    }
  });

  resetAppBtn.addEventListener('click', () => {
    sfx.playClick();
    solvedQuizzes[currentMode].clear();
    loadQuiz(0);
  });

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundToggleBtn.classList.remove('muted');
      soundToggleBtn.innerHTML = '<span class="icon">🔊</span> <span class="label">소리 켜짐</span>';
      sfx.playClick();
    } else {
      soundToggleBtn.classList.add('muted');
      soundToggleBtn.innerHTML = '<span class="icon">🔇</span> <span class="label">소리 꺼짐</span>';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  });

  ttsSpeakBtn.addEventListener('click', () => {
    sfx.playClick();
    speakCurrentQuizGuide();
  });

  // ================= 초기 실행 =================
  initNavChips();
  loadQuiz(0);
});
