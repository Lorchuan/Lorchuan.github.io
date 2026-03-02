document.addEventListener('DOMContentLoaded', function() {
    
    let wordData = {
        station: [
            { name: '手机“滴”一下', value: 95 },
            { name: '“碰一碰”', value: 90 },
            { name: '告别实体卡', value: 85 },
            { name: '无感支付', value: 85 },
            { name: '自动化交通系统', value: 80 },
            { name: '自动找零', value: 75 },
            { name: '车站全覆盖空调', value: 65 },
            { name: '多语言播报', value: 60 },
            { name: '缩短通勤时间', value: 55 },
            { name: '刷脸乘车', value: 45 }
        ],
        hawker: [
            { name: '告别钱包', value: 95 },
            { name: '扫码点单', value: 90 },
            { name: '智能点餐助手', value: 90 },
            { name: '极致效率', value: 85 },
            { name: '缺少人情味', value: 85 },
            { name: 'Kiasu(怕输)文化', value: 80 },
            { name: '自动化点单机', value: 75 },
            { name: 'App打折优惠', value: 70 },
            { name: '机器取代咖啡师', value: 65 },
        ],
        home: [
            { name: '扫地机器人', value: 90 },
            { name: 'Singpass数字身份', value: 95 },
            { name: '解决家务烦恼', value: 90 },
            { name: '手机办理政务', value: 85 },
            { name: '老人跌倒一键报警', value: 80 },
            { name: '适老化大字号', value: 70 },
            { name: '极简操作页面', value: 65 },
            { name: '智能洗衣机', value: 60 },
            { name: '早上语音叫醒', value: 45 }
        ],
        workplace: [
            { name: '消除重复性工作', value: 100 },
            { name: 'ChatGPT', value: 95 },
            { name: '拒绝替代人工', value: 90 },
            { name: 'DeepSeek', value: 85 },
            { name: '自动回邮件', value: 85 },
            { name: '担忧AI说假话', value: 80 },
            { name: '工作成果专业化', value: 75 },
            { name: '机器翻译', value: 70 },
            { name: '辅助维修工作', value: 65 },
            { name: 'Copilot', value: 80 },
            { name: '豆包', value: 60 },
            { name: '总结文献', value: 55 },
        ],
        school: [
            { name: '秒解不会难题', value: 95 },
            { name: '颠覆传统教法', value: 85 },
            { name: '担忧不良内容渗透', value: 80 },
            { name: '节约教育成本', value: 75 },
            { name: '改变未来规划', value: 70 },
            { name: '提供全新思路', value: 65 },
            { name: 'AI描述生成图片', value: 60 },
            { name: '查阅资料', value: 75 },
            { name: '制作海报', value: 50 },
            { name: '智能白板', value: 45 }
        ],
        hospital: [
            { name: '人类医生把关决策', value: 95 },
            { name: '隐私与效率的折中', value: 95 },
            { name: '极致便利', value: 90 },
            { name: '人机协作', value: 90 },
            { name: 'AI辅助问诊', value: 85 },
            { name: '接受位置轨迹追踪', value: 85 },
            { name: '年轻人反哺教老人', value: 80 },
            { name: '消费习惯记录', value: 70 },
            { name: '税收政策秒回', value: 65 },
            { name: '分析病人综合资料', value: 60 },
            { name: '担忧身份证号泄露', value: 55 },
        ]
    };

    const locNames = {
        station: '🚆 交通车站',
        hawker: '☕ 餐饮小贩',
        home: '🏠 居家生活',
        workplace: '🏢 办公场所',
        school: '🏫 学校教育',
        hospital: '🏥 医疗政务'
    };

    let currentLoc = null;
    let chartDom = document.getElementById('word-cloud-container');
    let myChart = echarts.init(chartDom);

    function renderCloud(locKey) {
        if (!locKey || !wordData[locKey]) return;
        
        document.getElementById('cloud-title').innerText = `${locNames[locKey]} 的高频词云`;
        
        let option = {
            tooltip: { show: true },
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                keepAspect: false,
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                sizeRange: [14, 65], // 拉大字体范围，凸显权重差异
                rotationRange: [-45, 45],
                rotationStep: 45,
                gridSize: 10,
                drawOutOfBound: false,
                textStyle: {
                    color: function () {
                        // 使用一组具有现代感、科技感的色系
                        const colors = ['#2b6cb0', '#2c5282', '#3182ce', '#38b2ac', '#4fd1c5', '#667eea', '#805ad5', '#e53e3e', '#d69e2e'];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }
                },
                emphasis: {
                    focus: 'self',
                    textStyle: { textShadowBlur: 8, textShadowColor: 'rgba(0,0,0,0.3)' }
                },
                data: wordData[locKey]
            }]
        };
        myChart.setOption(option);
    }

    const icons = document.querySelectorAll('.icon-item');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            icons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            currentLoc = this.getAttribute('data-loc');
            document.getElementById('loc-select').value = currentLoc; 
            renderCloud(currentLoc);
        });
    });

    document.getElementById('add-word-btn').addEventListener('click', function() {
        const targetLoc = document.getElementById('loc-select').value;
        const inputEl = document.getElementById('new-word-input');
        const newWord = inputEl.value.trim();

        if (newWord !== '') {
            // 用户新增词汇默认赋予较高权重以便立即显现
            wordData[targetLoc].push({ name: newWord, value: 85 }); 
            
            if (currentLoc === targetLoc) {
                renderCloud(targetLoc);
            }

            inputEl.value = '';
            const msg = document.getElementById('success-msg');
            msg.classList.remove('hidden');
            setTimeout(() => { msg.classList.add('hidden'); }, 3000);
        } else {
            alert('请先输入你要补充的观点哦！');
        }
    });

    window.addEventListener('resize', function() {
        myChart.resize();
    });
});
