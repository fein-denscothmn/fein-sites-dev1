// PDF.jsの設定
const url = '../another-eden/fein_report/grasta.pdf'; // PDFファイルのURLを設定
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

let pdfDoc = null,    // PDFドキュメントのオブジェクト
    pageNum = 1,     // 現在のページ番号
    pageRendering = false, // ページがレンダリング中かどうかのフラグ
    pageNumPending = null, // 保留中のページ番号
    feincanvas = document.createElement('canvas'), // キャンバス要素を作成
    ctx = feincanvas.getContext('2d'); // キャンバスの2Dコンテキストを取得

// キャンバスをPDFビューアのコンテナに追加
document.getElementById('feinpdf-viewer').appendChild(feincanvas);

// PDFをレンダリングする関数
function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(page => {
        const containerWidth = document.getElementById('feinpdf-viewer').clientWidth;
        const scale = 3; // 解像度を3倍に
        const viewport = page.getViewport({ scale: scale });

        feincanvas.height = viewport.height;
        feincanvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
            // プレビューエリアに合わせてキャンバスの幅を調整
            feincanvas.style.width = `${containerWidth}px`;
            feincanvas.style.height = "auto";

            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('page-num').textContent = num; // 現在のページ番号を表示
}

// 次のページをレンダリングする関数
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num; // ページレンダリングが保留中の場合、次のページ番号を設定
    } else {
        renderPage(num); // 直ちにページをレンダリング
    }
}

// PDFのドキュメントを取得してレンダリングを開始
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.getElementById('page-count').textContent = pdfDoc.numPages; // 総ページ数を表示
    renderPage(pageNum); // 最初のページをレンダリング
});

// 前のページボタンのイベントリスナー
document.getElementById('prev-page').addEventListener('click', () => {
    if (pageNum <= 1) {
        return; // 最初のページの場合、動作なし
    }
    pageNum--;
    queueRenderPage(pageNum); // 前のページをレンダリング
});

// 次のページボタンのイベントリスナー
document.getElementById('next-page').addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) {
        return; // 最後のページの場合、動作なし
    }
    pageNum++;
    queueRenderPage(pageNum); // 次のページをレンダリング
});
